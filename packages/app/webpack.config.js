// Config pulled from https://github.com/julian-george/dep-graph-visualization
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env.NODE_ENV || "development";

const finalCSSLoader =
  env === "production"
    ? MiniCssExtractPlugin.loader
    : { loader: "style-loader" };
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: env,
  output: { publicPath: "/" },
  entry: ["babel-polyfill", "./src"],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: { extensions: [".js", ".jsx"] },
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      favicon: "./src/assets/favicon.png",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new ESLintPlugin({
      extensions: ["ts", "tsx"],
      fix: false,
      emitError: true,
      emitWarning: true,
      failOnError: true,
    }),
    // new FaviconsWebpackPlugin("./src/assets/favicon.png"),
    autoprefixer,
  ],
  devServer: {
    static: "./src",
    historyApiFallback: true,
    port: 3000,
    client: {
      overlay: false,
    },
  },
};
