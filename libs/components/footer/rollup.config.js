import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// RegEx needed to check for trailing characters, eg
// @material-ui/core/Container
const rex = (module) => new RegExp(`^${module}(/.+)*$`);
const external = [
  '@vroom-web/cat-sdk',
  'prop-types',
  'react',
  'react-dom',
  '@material-ui/core',
].map((i) => rex(i));

const config = {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  external,
  plugins: [
    resolve({ extensions }),
    url(),
    svgr(),
    babel({
      extensions,
      exclude: ['node_modules/**', '*.stories.*'],
    }),
    commonjs(),
  ],
};

export default config;
