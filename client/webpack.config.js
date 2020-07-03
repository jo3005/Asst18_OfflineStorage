const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

const config = {
  entry: {
    app: "./assets/js/index.js",
    //favorites: "./assets/js/favorites.js",
    //topic: "./assets/js/topic.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
        icons: [{
        src: path.resolve("assets/images/icons/android-chrome-192x192.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ]
};

module.exports = config;
