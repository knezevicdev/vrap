import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const config = {
  external: Object.keys(pkg.peerDependencies),
  input: './src/index.ts',
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
  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      exclude: ['node_modules/**'],
    }),
    commonjs(),
  ],
};

export default config;
