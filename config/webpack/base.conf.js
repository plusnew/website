const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const PROJECT_ROOT = path.join(__dirname, '..', '..');

const getConfig = (opt) => ({
  context: path.join(PROJECT_ROOT, 'src'),
  entry: ['./index.tsx'],
  mode: opt.mode,
  devServer: opt.devServer,
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
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [],
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
          }
        }]
      },
      ...opt.rules,
    ]
  },
  optimization: opt.optimization,
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

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(PROJECT_ROOT, 'tsconfig.json'),
    }),

    ...opt.plugins,
  ],
});

module.exports = (env) => {
  const plugins = [];
  const rules = [];

  if (env.mode === 'test') {
    plugins.push(  new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|tsx)($|\?)/i // process .js and .ts files only
    }));

    rules.push({
      enforce: 'post',
      test: /\.tsx?$/,
      loader: 'istanbul-instrumenter-loader',
      include: path.resolve('src/'),
      exclude: /\.test\.ts?$/,
      options: {
        esModules: true
      }
    });
  }

  const opt = {
    mode: env.mode === 'test' ? 'development' : env.mode,
    devServer: env.mode === 'development' ?  {
      port: 3000,
      clientLogLevel: "info",
      historyApiFallback: true,
    } : undefined,
    plugins,
    rules,
    optimization: env.mode === 'test' ? {
      splitChunks: undefined,
    } : {
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
  }

  return getConfig(opt);
}