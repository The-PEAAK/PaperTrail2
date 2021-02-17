const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // match the output path
    // enable HMR on the devServer
    hot: true,
    // match the output 'publicPath'
    // fallback to root for other urls
    // historyApiFallback: true,

    publicPath: '/build',
    proxy: {
      '/': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
      '/**/*':'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.s?css/i,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          }
        ]
      }
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({ template: './index.html' }),
  // ],
//
};
