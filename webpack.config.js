const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/app/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "messenger.bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin({extensions: [".ts", ".js", ".json"]})],
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json")
            }
          }
        ],
        exclude: /(node_modules)/
      }, {
        test: /\.svg?$/,
        type: "app/images"
      }, {
        test: /\.(scss|css)$/i,
        include: path.resolve(__dirname, "src"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }, {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080
  }
};