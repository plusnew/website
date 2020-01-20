const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const PROJECT_ROOT = path.join(__dirname, '..', '..',);

module.exports = {
  context: path.join(PROJECT_ROOT, 'src'),
  entry: ['./index.tsx'],
  mode: 'development',
  output: {
    path: path.join(PROJECT_ROOT, 'dist'),
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
          // MiniCssExtractPlugin.loader,
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
              localsConvention: 'camelCase',
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          BabelMultiTargetPlugin.loader(),
        ]
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

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '..', '..', 'dist')],
    }),

    new HtmlWebpackPlugin({
      title: 'plusnew app',
      inject: 'head',
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[hash].css',
    //   chunkFilename: 'css/[name].[hash].bundle.css',
    // }),

    new BabelMultiTargetPlugin({
      babel: {
        plugins: [
          "@babel/plugin-proposal-class-properties",
          [
            '@babel/plugin-transform-react-jsx',
            {
              pragma: 'plusnew.createElement',
              pragmaFrag: 'plusnew.Fragment',
              throwIfNamespace: false,
            },
          ],
          [
            '@babel/plugin-transform-typescript',
            {
              isTSX: true,
              jsxPragma: 'plusnew'
            }
          ],
        ],
      },
      targets: {
        modern: {
          key: 'modern',
          tagAssetsWithKey: true,
        },
        legacy: {
          key: 'legacy',
          tagAssetsWithKey: true,
        }
      },
    }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(PROJECT_ROOT, 'tsconfig.json'),
    }),
  ],
};
