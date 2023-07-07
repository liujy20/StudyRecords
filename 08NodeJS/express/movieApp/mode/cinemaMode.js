const { Schema, model } = require("mongoose");

let cinameModel=new Schema({
  name:String,
  address:String,
  phoneimg_src:String,
  movies:[
    {
      type:Schema.Types.ObjectId,
      ref:'nowPlayingModel'
    }
  ]
})

model('cinemaModel',cinameModel,'cinema')