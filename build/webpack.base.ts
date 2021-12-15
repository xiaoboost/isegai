import path from 'path';
import Webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as utils from './utils';
import * as config from './config';

const isDevelopment = process.env.NODE_ENV === 'development';

console.log('\x1Bc');

const tsLoaderConfig = isDevelopment
  ? {
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015',
      tsconfigRaw: require(utils.resolve('tsconfig.json')),
    },
  }
  : {
    loader: 'ts-loader',
    options: {
      configFile: utils.resolve('tsconfig.json'),
      compilerOptions: {
        module: 'ESNext',
        target: 'ESNext',
      },
    },
  };

const baseConfig: Webpack.Configuration = {
  mode: process.env.NODE_ENV as Webpack.Configuration['mode'],
  entry: [
    utils.resolve('src/init/index.ts'),
  ],
  output: {
    path: config.output,
    publicPath: config.publicPath,
    filename: isDevelopment ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: isDevelopment ? 'js/[name].js' : 'js/[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
    mainFiles: ['index.tsx', 'index.ts', 'index.js', 'index.css'],
    mainFields: ['source', 'module', 'main'],
    alias: {
      src: utils.resolve('src'),
      '@xiao-ai/utils/web': utils.resolve('node_modules/@xiao-ai/utils/dist/esm/web/index.js'),
      '@xiao-ai/utils/use': utils.resolve('node_modules/@xiao-ai/utils/dist/esm/use/index.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        ...tsLoaderConfig,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|webp|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  optimization: {
    concatenateModules: true,
    moduleIds: 'deterministic',
    splitChunks: {
      maxInitialRequests: Infinity,
      minSize: 0,
      minChunks: 1,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/][\d\D]+?\.(t|j)s/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': isDevelopment ? '"development"' : '"production"',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? 'styles/main.css'
        : 'styles/main.[contenthash:20].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: utils.resolve('src/assets/favicon.ico'),
    //       to: path.join(config.output, 'images/favicon.ico')
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      data: {
        version: utils.version,
        build: utils.build,
        year: new Date().getFullYear(),
      },
      template: utils.resolve('src/index.html'),
      inject: true,
      minify: {
        removeComments: !isDevelopment,
        collapseWhitespace: !isDevelopment,
        ignoreCustomComments: [/^-/],
      },
    }),
    new ProgressBarPlugin({
      width: 40,
      format: '> building: [:bar] :percent (:elapsed seconds)',
    }),
  ],
};

export default baseConfig;
