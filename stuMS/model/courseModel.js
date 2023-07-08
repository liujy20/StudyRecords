const { Schema, model } = require("mongoose");
// 创建模型
let courseSchema = new Schema({
  name: String,
  credit: Number,
});
// 链接集合
model("courseModel", courseSchema, "course");
