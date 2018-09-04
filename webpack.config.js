var path = require("path");
// var webpack = require("webpack");

module.exports = {
  entry: "./static/dev/js/main.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "static/dist/"),
    filename: "bundle.js"
  },
  optimization: {
    minimize: true
  },
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  devtool: "source-map"
};