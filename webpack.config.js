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
  devtool: false,
  entry: {
    bundle: './src/index.tsx',
    serviceWorker: './src/serviceWorker.ts',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff2?$/,
        use: 'file-loader',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: [
              '**/index.html',
            ],
          },
        },
      ],
    }),
    new Dotenv({
      safe: false,
      systemvars: true,
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
