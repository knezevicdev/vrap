import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

const config = {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions, preferBuiltins: false }),
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
