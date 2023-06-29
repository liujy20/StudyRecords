const path=require('path')
const htmlWebPlugin=require('html-webpack-plugin')
const miniCssExtractPlugin=require('mini-css-extract-plugin')
const jsArr=['index','login']
function getEntry(arr){
  let res={}
  arr.forEach(item=>{
    res[item]=`./src/js/${item}.js`
  })
  return res
}
function getPlugin(arr){
  let res=[]
  arr.forEach(item=>{
    res.push(new htmlWebPlugin({
      template:`./src/html/${item}.html`,
      filename:`./html/${item}.html`,
      chunks:[item]
    }))
  })
  return res
}
module.exports={
  mode:'production',
  entry:getEntry(jsArr),
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'./js/[name].js'
  },
  plugins:[
    ...getPlugin(jsArr),
    new miniCssExtractPlugin({
      filename:'./css/[name].css'
    })
  ],
  module:{
    rules:[
      {
        test:/\.css$/i,
        use:[miniCssExtractPlugin.loader,'css-loader']
      }
    ]
  }
}