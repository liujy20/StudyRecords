const { model } = require("mongoose")

class ClassController{
  async findAll(req,res){
    let re=await model('classModel').find({})
    res.send({
      code:200,
      msg:'查询成功',
      data:re
    })
  }
}

module.exports=ClassController