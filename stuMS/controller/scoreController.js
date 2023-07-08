const { model } = require("mongoose");

class ScoreController {
  async findStuClassCourse(req, res) {
    let re = await model("scoreModel")
      // 查找全部数据
      .find({})
      //嵌套查询
      .populate({
        path: "studentId",
        //嵌套查询
        populate: {
          path: "classId",
        },
      })
      //嵌套查询
      .populate({
        path: "courseId",
      })
      .sort({
        sc: -1, //降序排序
      });
    res.send({
      code: 200,
      msg: "查询成功",
      data: re,
    });
  }
}

module.exports = ScoreController;
