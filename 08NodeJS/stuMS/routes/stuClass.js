let express=require('express')
let router=express.Router()

let ClassController=require('../controller/classController')
let classController=new ClassController()
// 查询所有班级
router.get('/findAll',(req,res)=>{
  classController.findAll(req,res)
})

module.exports=router