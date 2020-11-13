/* eslint-env node */
import cleaner from 'rollup-plugin-cleaner';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const external = Object.keys(globals);
const extensions = ['.ts', '.tsx'];

const plugins = [
  cleaner({
    targets: ['./dist/'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  commonjs(),
  nodeResolve({
    extensions,
  }),
  typescript(),
].filter(Boolean);

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    globals,
  },
  plugins,
  external,
};
