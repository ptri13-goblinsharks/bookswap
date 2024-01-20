const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/action': 'http://localhost:3000',
      '/library': 'http://localhost:3000',
    },
    historyApiFallback: true,

    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GSBookswap',
      filename: 'index.html',
      template: './index.html',
    }),
  ],
};
