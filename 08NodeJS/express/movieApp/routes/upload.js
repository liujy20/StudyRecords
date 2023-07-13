let express=require('express')
const UploadController = require('../controller/uploadController')
let router=express.Router()

let uploadController=new UploadController()
router.post('/pic',(req,res)=>{
  uploadController.uploadPic(req,res)
})

module.exports=router