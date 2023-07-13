const { uploadFiles } = require("../util/handleFile")

class UploadController{
  uploadPic(req,res){
    let method=uploadFiles({path:'./public/images',key:'icon',size:1000})
    method(req,res,function(err){
      console.log(req.files);
      if(err){
        res.send({
          code:200,
          msg:'文件上传失败'
        })
      }else{
        res.send({
          code:200,
          msg:'文件上传成功',
          data:req.files[0].filename
        })
      }
    })
  }
} 
module.exports=UploadController