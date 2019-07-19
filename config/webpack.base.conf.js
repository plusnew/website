const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').default;
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx'],
  mode: 'development',
  output: {
    path: __dirname + '/../dist',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsConfigPathsPlugin()],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              camelCase: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        default: {
          minChunks: 1,
        }
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public' },
      {
        from: require.resolve('plusnew'),
        to: 'plusnew.js',
      }
    ]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '..', 'dist')],
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: path.join('public', 'index.html')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].bundle.css',
    }),
  ],
  externals: [
    function (context, request, callback) {
      const contextParts = path.parse(context);
      if (request === 'enzyme' && contextParts.base !== 'karma') {
        return callback(null, request);
      } else if (request === '__dirname') { // This module creates a string for each module, in what directory it is existent
        // const dirname = context.slice(path.resolve(__dirname, '../../src').length + 1);

        const lastDir = path.parse(context).name;
        return callback(null, JSON.stringify({ default: lastDir }));
      }
      callback();
    },
  ],
};
