import * as fs from 'fs';
import * as config from './config';

import { compile } from './utils';

import baseConfig from './webpack.base';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

if (!baseConfig.optimization) {
  baseConfig.optimization = {
    minimize: true,
  };
}

if (!baseConfig.optimization.minimizer) {
  baseConfig.optimization.minimizer = [];
}

baseConfig.optimization.minimizer = baseConfig.optimization.minimizer.concat([
  new CssMinimizerPlugin(),
  new TerserPlugin({
    extractComments: false,
    terserOptions: {
      ecma: 'es6',
      module: false,
      format: null,
      nameCache: null,
      ie8: false,
      safari10: false,
    },
  }),
]);

baseConfig.performance = {
  hints: false,
  // 以下两个选项单位为 bytes
  maxAssetSize: 512000,
  maxEntrypointSize: 512000,
};

baseConfig.plugins = baseConfig.plugins?.concat(
  new (BundleAnalyzerPlugin as any)(),
);

// 删除输出文件夹
if (fs.existsSync(config.output)) {
  fs.rmSync(config.output, { recursive: true });
}

compile(baseConfig, 'Build complete.');
