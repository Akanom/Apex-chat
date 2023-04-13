const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();


// similar to the client side configuration for development mode but without
//the hot reload plugin and debug configuration

const config = {
  mode: "production",
  entry: [path.join(CURRENT_WORKING_DIR, "client/main.js")],
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(jsx)?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};

module.exports = config;
