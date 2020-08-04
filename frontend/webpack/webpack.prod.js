'use strict';

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const base = require('./webpack.config');

module.exports = merge(base, {
  mode: 'production',
  watch: false,
  plugins: [
    new webpack.DefinePlugin({
      isProd: true,
    }),
  ],
});
