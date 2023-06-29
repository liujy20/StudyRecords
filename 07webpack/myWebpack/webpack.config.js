const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const devServer = require('webpack-dev-server')
const webpack = require("webpack");
const jsArr = ["index", "login"];
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
  // plugins:[
  //   new htmlWebpackPlugin({
  //       template:'要打包的HTML文件路径(参照当前配置文件位置查找目标文件)',
  //       filename:'打包后的HTML文件存储在父文件夹的具体位置和名称(参照父文件夹路径)',
  //       chunks:['要引入的主JS文件名称(entry属性名)']
  //   }),
  // ]
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
      "$": "jquery",
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
    },
  },
  devServer:{
    port:'8099',
    open:{
      target:'./html/index.html',
      app:{
        name:'chrome'
      }
    },
    // open:'./html/index.html',
    hot:true
  }
};
