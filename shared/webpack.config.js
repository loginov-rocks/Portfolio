/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  devtool: false,
  entry: './src/index.ts',
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
