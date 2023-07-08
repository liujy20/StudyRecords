const { Schema, model } = require("mongoose");
// 创建模型
let classSchema = new Schema({
  name: String,
});
// 链接集合
model("classModel", classSchema, "class");
