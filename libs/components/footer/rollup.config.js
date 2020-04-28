import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// RegEx needed to check for trailing characters, eg
// @material-ui/core/Container
const rex = (module) => new RegExp(`^${module}(/.+)*$`);
const external = [
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
    babel({
      extensions,
      exclude: ['node_modules/**', '*.stories.*'],
    }),
  ],
};

export default config;
