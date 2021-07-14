import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
    },
    plugins: [
      nodeResolve(),
      eslint(),
      typescript(),
      terser(),
    ],
    external: ['three', 'canvas-ui'],
  },
]