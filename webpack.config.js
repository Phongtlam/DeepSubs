const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, 'public');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    `${SRC_DIR}/index.jsx`,
  ],

  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    publicPath: '/public/',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.join(__dirname, '/client/src/styles') },
      { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: 'file-loader',
            options: {
              query: { name: 'assets/[name].[ext]' },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
