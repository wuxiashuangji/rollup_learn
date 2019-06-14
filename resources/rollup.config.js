import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

import postcss from 'rollup-plugin-postcss'
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
// import css from '@modular-css/rollup';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import json from 'rollup-plugin-json'
export default {
  input: 'src/index.js',

  plugins: [
    postcss({
      extensions: ['.css'],
      extract: true, // 是否提取
      plugins: [
        simplevars(),
        nested(),
        postcssPresetEnv({
          autoprefixer: {
            autoprefixer: true,
            browsers: ['Android > 4.2', 'iOS >= 7']
          }
        }),
        cssnano()
      ]
    }),
    resolve({
      jsnext: true,
      browser: true
    }),
    commonjs({
      sourceMap: false
    }),
    eslint({
      exclude: [
        'src/assets/**',
        'src/static/**/*',
        'lib/**/*'
      ]
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    serve({ open: true, contentBase: './', historyApiFallback: true, host: 'localhost', port: 10001 }),
    (process.env.NODE_ENV === 'development' && livereload({ watch: 'dist' })),
    json()
  ],
  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'Demo',
      sourcemap: true,
      globals: {
        jsonp: 'jsonp',
        'jquery': '$' // 告诉rollup 全局变量$即是jquery
      }
    }
  ]
}
