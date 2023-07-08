const { Schema, model } = require("mongoose");
// 创建模型
let studentSchema = new Schema({
  name: String,
  age: Number,
  tel: String,
  classId: {
    type: Schema.Types.ObjectId,
    ref: "classModel",
  },
});
// 链接集合
model("studentModel", studentSchema, "student");
