/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const aliases = ['App', 'Portfolio', 'Shared', 'Stocks', 'User', 'ZenMoney'];

module.exports = {
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
  resolve: {
    alias: Object.assign({}, ...aliases.map(dir => ({ [dir]: path.resolve(__dirname, `src/${dir}`) }))),
    extensions: ['.js', '.ts', '.tsx'],
  },
};
