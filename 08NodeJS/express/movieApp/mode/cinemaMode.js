const { Schema, model } = require("mongoose");

let cinameModel=new Schema({
  name:String,
  address:String,
  phoneimg_src:String,
  movies:Array
})

model('cinemaModel',cinameModel,'cinema')