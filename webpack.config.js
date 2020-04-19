const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const BabelMultiTargetPlugin = require("webpack-babel-multi-target-plugin")
  .BabelMultiTargetPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const getConfig = (opt) => ({
  context: path.join(__dirname, "src"),
  entry: {
    main: "./index.tsx",
  },
  mode: opt.mode,
  devServer: opt.devServer,
  output: {
    path: path.join(__dirname, "dist"),
    filename: `static/js/[name].[hash].js`,
    chunkFilename: `static/js/[name].[hash].bundle.js`,
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsConfigPathsPlugin()],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
              localsConvention: "camelCase",
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/assets/[path][name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [BabelMultiTargetPlugin.loader()],
      },
      ...opt.rules,
    ],
  },
  optimization: opt.optimization,
  plugins: [
    new HtmlWebpackPlugin({
      title: "plusnew",
      minify: false,
    }),
    new BabelMultiTargetPlugin({
      babel: {
        plugins: [
          "@babel/plugin-proposal-class-properties",
          [
            "@babel/plugin-transform-react-jsx",
            {
              pragma: "plusnew.createElement",
              pragmaFrag: "plusnew.Fragment",
              throwIfNamespace: false,
            },
          ],
          [
            "@babel/plugin-transform-typescript",
            {
              onlyRemoveTypeImports: true,
              isTSX: true,
              jsxPragma: "plusnew",
            },
          ],
        ],
      },
      targets: {
        modern: {
          tagAssetsWithKey: false,
        },

        legacy: {
          key: "legacy",
          tagAssetsWithKey: true,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/[name].[contenthash].css`,
      chunkFilename: `static/css/[name].[contenthash].css`,
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")],
    }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(__dirname, "tsconfig.json"),
    }),

    new MonacoWebpackPlugin(),

    ...opt.plugins,
  ],
});

module.exports = (env) => {
  const plugins = [];
  const rules = [];

  if (env.mode === "test") {
    plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: null, // if no value is provided the sourcemap is inlined
        test: /\.(ts|tsx)($|\?)/i, // process .js and .ts files only
      })
    );

    rules.push({
      enforce: "post",
      test: /\.tsx?$/,
      loader: "istanbul-instrumenter-loader",
      include: path.resolve("src/"),
      exclude: /\.test\.ts?$/,
      options: {
        esModules: true,
      },
    });
  }

  const opt = {
    mode: env.mode === "test" ? "development" : env.mode,
    devServer:
      env.mode === "development"
        ? {
            port: 3000,
            clientLogLevel: "info",
            historyApiFallback: true,
          }
        : undefined,
    plugins,
    rules,
    optimization:
      env.mode === "test"
        ? {
            splitChunks: undefined,
          }
        : {
            splitChunks: {
              chunks: "all",
              minSize: 0,
              cacheGroups: {
                default: {
                  minChunks: 1,
                },
              },
            },
          },
  };

  return getConfig(opt);
};
