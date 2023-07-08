let express=require('express')
let router=express.Router()

let ScoreController=require('../controller/scoreController')
let scoreController=new ScoreController()
// 查询成绩对应的学生-班级-课程
router.get('/findStuClassCourse',(req,res)=>{
  scoreController.findStuClassCourse(req,res)
})

module.exports=router