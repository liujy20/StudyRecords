let { Schema, model } = require('mongoose');
// 影院
let userSchema = new Schema({
  account:String,
  password:String
},{
  versionKey:false
});
model("userModel", userSchema, "user");