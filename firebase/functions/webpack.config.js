/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: false,
  entry: './src/index.ts',
  externals: [
    nodeExternals(),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'lib'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
  },
  target: 'node',
};
