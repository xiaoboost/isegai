import Webpack from 'webpack';

import baseConfig from './webpack.base';

import { WebpackPluginServe } from 'webpack-plugin-serve';
import { output } from './config';
import { compile } from './utils';

const port = 5555;

baseConfig.watch = true;
baseConfig.devtool = 'eval-source-map';
(baseConfig.entry as string[]).unshift('webpack-plugin-serve/client');
baseConfig.plugins = baseConfig.plugins?.concat(
  new Webpack.NoEmitOnErrorsPlugin(),
  new WebpackPluginServe({
    port,
    static: output,
    log: {
      level: 'error',
    },
  }),
);

compile(baseConfig, `App set at http://localhost:${port}/`);
