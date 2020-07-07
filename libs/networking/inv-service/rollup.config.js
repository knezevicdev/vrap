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
    resolve({ extensions }),
    babel({
      extensions,
      exclude: ['node_modules/**', '*.stories.*'],
      // plugins: ['babel-plugin-external-helpers'],
      // externalHelpers: true,
      runtimeHelpers: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/toposort/index.js': ['default'],
        'node_modules/property-expr/index.js': ['getter'],
        'node_modules/qs/lib/index.js': ['stringify'],
        'node_modules/synchronous-promise/index.js': ['SynchronousPromise'],
        'node_modules/@babel/runtime/helpers/classCallCheck.js': ['default'],
        'node_modules/@babel/runtime/regenerator/index.js': ['default'],
      },
      include: [
        /node_modules\/toposort/,
        /node_modules\/property-expr/,
        /node_modules\/qs/,
        /node_modules\/synchronous-promise/,
        /node_modules\/@babel\/runtime\/helpers/,
        /node_modules\/@babel\/runtime\/regenerator/,
      ],
    }),
  ],
  external: Object.keys(pkg.peerDependencies),
};

export default config;