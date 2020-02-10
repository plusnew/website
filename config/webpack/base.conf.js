const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const PROJECT_ROOT = path.join(__dirname, '..', '..');

const browserlist = {
  modern: [
    // The last two versions of each browser, excluding versions
    // that don't support <script type="module">.
    'last 2 Chrome versions', 'not Chrome < 60',
    'last 2 Safari versions', 'not Safari < 10.1',
    'last 2 iOS versions', 'not iOS < 10.3',
    'last 2 Firefox versions', 'not Firefox < 54',
    'last 2 Edge versions', 'not Edge < 15',
  ],
  legacy: [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
  ]
};

const getConfig = (opt) => ({
  context: path.join(PROJECT_ROOT, 'src'),
  entry: {
    modern: './index.tsx?esVersion=modern',
    legacy: './nomodule.ts?esVersion=legacy'
  },
  mode: opt.mode,
  devServer: opt.devServer,
  output: {
    path: path.join(PROJECT_ROOT, 'dist'),
    filename: `js/[name].${opt.esVersion}.[hash].js`,
    chunkFilename: `js/[name].${opt.esVersion}.[hash].bundle.js`,
    publicPath: '/',
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
            presets: [
              ['@babel/preset-env', {
                loose: true,
                modules: false,
                // debug: true,
                corejs: 3,
                useBuiltIns: 'usage',
                targets: {
                  browsers: browserlist[opt.esVersion],
                },
              }],],
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
    new MiniCssExtractPlugin({
      filename: `css/[name].[contenthash].css`,
      chunkFilename: `css/[id].[contenthash].css`,
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '..', '..', 'dist')],
    }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(PROJECT_ROOT, 'tsconfig.json'),
    }),

    new CopyPlugin([
      { from: `${PROJECT_ROOT}/public` },
    ]),

    ...opt.plugins,
  ],
});

module.exports = (env) => {
  const plugins = [];
  const rules = [];

  if (env.mode === 'test') {
    plugins.push(new webpack.SourceMapDevToolPlugin({
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
    esVersion: 'modern',
    devServer: env.mode === 'development' ? {
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

  if (opt.mode === 'production') {
    return [
      getConfig({
        ...opt,
        esVersion: 'legacy'
      }),
      getConfig({
        ...opt,
        esVersion: 'modern'
      })
    ];
  }

  return getConfig(opt);
}