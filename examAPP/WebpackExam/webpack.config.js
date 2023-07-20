const path = require("path");
const webpack=require('webpack')
//引入HTML打包插件
let htmlWebpackPlugin = require("html-webpack-plugin");
//引入CSS打包插件
let miniCssExtractPlugin = require("mini-css-extract-plugin");
//存储要打包的页面名称
let pageArr = ['index','register','login','user','collection','wrong','testList','testIndex','test','testEnd','answer'];
//根据要打包的页面生成entry值
function getEntry(arr) {
  let entryObj = {};
  arr.forEach((pageName) => {
    entryObj[pageName] = `./src/js/${pageName}.js`;
  });
  return entryObj;
}
//根据要打包的页面生成plugin值
function getHTMLPlugin(arr) {
  let htmlArr = [];
  arr.forEach((pageName) => {
    htmlArr.push(
      new htmlWebpackPlugin({
        template: `./src/html/${pageName}.html`,
        filename: `./html/${pageName}.html`,
        chunks: [pageName],
      })
    );
  });
  return htmlArr;
}
module.exports = {
  mode: "production", //打包模式
  entry: getEntry(pageArr),
  output: {
    //配置出口
    path: path.resolve(__dirname, "dist"), //路径拼接 F:\studentInfo\34\program\week2\day07\myWebpack\dist
    filename: "./js/[name].js", //配置文件打包后以什么名字进行输出,基于path文件查找目标文件
  },
  plugins: [
    ...getHTMLPlugin(pageArr),
    //配置CSS插件
    new miniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  module: {
    rules: [
      //CSS
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
      //SCSS
      {
        test: /\.s[ca]ss$/i,
        exclude: /node_modules/,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      //图片
      //CSS文件中图片打包配置
      {
        test: /\.(png|jpe?g|gif|svg|webp|tif|tiff|wbmp|ico|jng|bmp|svgz)$/i,
        type: "javascript/auto",
        use: {
          loader: "url-loader",
          options: {
            limit: 8 * 1024, //8KB
            outputPath: "./image/",
            esModule: false,
          },
        },
      },
      //html文件中图片打包配置
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
  devServer: {
    port: "1818",
    open: "./html/index.html",
    hot: true,
  },
  performance:{
    hints:false
  }
};
