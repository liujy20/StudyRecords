const express = require('express')

let router=express.Router()

router.get('/login',()=>{
  console.log('登陆成功');
})

module.exports=router