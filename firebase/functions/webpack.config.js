/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  devtool: false,
  entry: './src/index.ts',
  externals: {
    'actions-on-google': 'commonjs actions-on-google',
    busboy: 'commonjs busboy',
    cors: 'commonjs cors',
    'firebase-admin': 'commonjs actions-on-google',
    'firebase-functions': 'commonjs firebase-functions',
    'node-vibrant': 'commonjs node-vibrant',
  },
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
