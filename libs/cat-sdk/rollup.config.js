import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const config = {
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
    builtins(),
    resolve({ browser: true, extensions }),
    babel({
      extensions,
      exclude: ['node_modules/**'],
      runtimeHelpers: true,
    }),
    commonjs(),
  ],
  external: Object.keys(pkg.peerDependencies),
};

export default config;
