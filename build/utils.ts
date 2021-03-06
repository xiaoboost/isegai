import path from 'path';
import Webpack from 'webpack';

/** 当前版本号 */
export { version } from '../package.json';

/**
 * Generate tag of build
 * @returns {string}
 */
function buildTag() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const time = now.toTimeString().slice(0, 8);

  return `${year}.${month}.${date} - ${time}`;
}

/** 当前编译标签 */
export const build = buildTag();

/**
 * 定位到项目根目录
 * @param {string} dir 路径
 */
export function resolve(...dir: string[]) {
  return path.join(__dirname, '..', ...dir).replace(/[\\/]/g, '/');
}

export function compile(config: Webpack.Configuration, message: string) {
  Webpack(config, (err, stats) => {
    console.log('\x1Bc');

    if (err) {
      throw err;
    }

    if (stats) {
      console.log(stats.toString({
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        colors: true,
        modules: false,
        children: false,
      }));

      console.log(`\n  ${message}\n`);
    }
  });
}
