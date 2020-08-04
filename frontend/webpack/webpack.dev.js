'use strict';

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'development',
  // watch: true,
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  // },
  plugins: [
    new webpack.DefinePlugin({
      isProd: false,
    }),
  ],
});
