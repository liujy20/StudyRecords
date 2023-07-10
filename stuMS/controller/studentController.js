const { model } = require("mongoose");

class StudentControlller {
  // 分页查询学生
  async findByPage(req, res) {
    let { page, count } = req.query;
    let all =await model('studentModel').countDocuments()
    all=parseInt(all/count)+1
    let re = await model("studentModel")
      .find({}) // 查找全部数据
      .skip((page - 1) * count) // 确定第page页开始的数据
      .limit(count) // 确定每页数据条数
      .select(["name", "tel"]); // 筛选对应数据
    res.send({
      code: 200,
      msg: "查询成功",
      all:all,
      data: re,
    });
  }

  // 模糊查询学生-班级
  async findStuClas(req, res) {
    let { str } = req.body;
    let re = await model("studentModel")
      .find({}) // 查找全部数据
      .populate("classId"); // 嵌套查询
    // 模糊筛选
    let data = re.filter((item) => {
      return item.name.includes(str);
    });
    res.send({
      code: 200,
      msg: "查询成功",
      data: data,
    });
  }
}

module.exports = StudentControlller;
