let mongoose = require("mongoose");

let myUrl = "mongodb://127.0.0.1:27017/movieM";
mongoose.connect(myUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("mongodb启动");
});

let { Schema, model } = mongoose;
let cinemaSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  movies: Array,
  img_Src: String,
});
model("cinemaModel", cinemaSchema, "cinema");

let userSchema=new Schema({
  account:String,
  password:String,
  age:Number
},{versionKey:false})
model('userModel',userSchema,'user')

