import typescript from 'rollup-plugin-typescript2'

export default [
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.esm.js',
      format: 'esm',
    },
    plugins: [typescript()],
    external: ['three', 'canvas-ui'],
  },
  {
    input: './src/index.ts',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [typescript()],
    external: ['three', 'canvas-ui'],
  },
]