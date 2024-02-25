import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { swc } from 'rollup-plugin-swc3';
import { terser } from 'rollup-plugin-terser';

const isWatchMode = process.env.ROLLUP_WATCH;
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const plugins = [
  peerDepsExternal(),
  resolve({ extensions }),
  swc({
    extensions,
    include: ['src/**/*'],
    exclude: 'node_modules/**',
    tsconfig: './tsconfig.json',
    sourceMaps: true,
  }),
  commonjs({ extensions }),
  !isWatchMode && terser(),
];

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
  },
];

export default config;
