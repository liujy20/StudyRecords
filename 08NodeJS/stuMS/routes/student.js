let express=require('express')
let router=express.Router()

let StudentController=require('../controller/studentController')
let studentController=new StudentController()
// 分页查询
router.get('/findByPage',(req,res)=>{
  studentController.findByPage(req,res)
})
// 模糊查询学生学校-班级
router.post('/findStuClass',(req,res)=>{
  studentController.findStuClas(req,res)
})

module.exports=router