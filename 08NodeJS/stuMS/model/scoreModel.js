const { Schema, model } = require("mongoose");
// 创建模型
let scoreSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "studentModel",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courseModel",
  },
  sc: Number,
});
// 链接集合
model("scoreModel", scoreSchema, "score");
