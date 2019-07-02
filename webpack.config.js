/* eslint-disable @typescript-eslint/no-var-requires */

const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'public',
        ignore: 'index.html',
      },
    ]),
    new Dotenv({
      safe: false,
    }),
    new HtmlPlugin({
      inject: false,
      template: 'public/index.html',
    }),
  ],
  resolve: {
    alias: {
      Constants: path.resolve(__dirname, 'src/Constants.ts'),
      State: path.resolve(__dirname, 'src/State.ts'),
    },
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
  },
};
