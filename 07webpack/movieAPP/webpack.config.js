const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const devServer = require("webpack-dev-server");
const webpack = require("webpack");
const jsArr = [
  "login",
  "register",
  "index",
  "movieDetail",
  "chooseTicket",
  "confirm",
  "success",
  "ticketDetail",
  "route"
];
function getEntry(arr) {
  let obj = {};
  arr.forEach((item) => {
    return (obj[item] = `./src/js/${item}.js`);
  });
  return obj;
}
function getPlugin(arr) {
  let res = [];
  arr.forEach((item) => {
    res.push(
      new htmlWebpackPlugin({
        template: `./src/html/${item}.html`,
        filename: `./html/${item}.html`,
        chunks: [item],
      })
    );
  });
  return res;
}
module.exports = {
  mode: "production",
  // entry:{
  //   index:'./src/js/index.js'
  // },
  entry: getEntry(jsArr),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].js",
  },
  plugins: [
    ...getPlugin(jsArr),
    new miniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: "./src/video",
          to: "./video",
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery:"jquery"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "javascript/auto",
        use: {
          loader: "url-loader",
          options: {
            limit: 8 * 1024,
            outputPath: "./img",
            esModule: false,
          },
        },
      },
      {
        test: /\.(htm?l)$/i,
        use: ["html-withimg-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@css": path.resolve(__dirname, "./src/css"),
      "@scss": path.resolve(__dirname, "./src/scss"),
      "@js": path.resolve(__dirname, "./src/js"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@img": path.resolve(__dirname, "./src/img"),
    },
  },
  devServer: {
    port: "8099",
    open: {
      target: "./html/index.html",
      app: {
        name: "chrome",
      },
    },
    // open:'./html/index.html',
    hot: true,
  },
};
