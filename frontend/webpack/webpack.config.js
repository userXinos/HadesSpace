'use strict';

const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chank.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      // },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: path.resolve(__dirname, '../src/static/')},
      ],
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new VueLoaderPlugin(),
    new RuntimeAnalyzerPlugin(),
  ]
      .concat(
          generateHtmlPlugins('../src/pages'),
      ),
};

function generateHtmlPlugins(templateDir) {
  return fs.readdirSync(path.resolve(__dirname, templateDir))
      .map((item) => {
        const name = item.split('.')[0];

        return new HTMLPlugin({
          filename: `${name}.html`,
          template: path.resolve(__dirname, `${templateDir}/${item}`),
        });
      });
}
