const phone = $('.phone input')
const pwd = $('.pwd input')
const eye = $('.pwd .eyes')
// 验证规则
const rePhone = /^1[3|4|5|7|8]\d{9}$/
const rePwd = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/
phone.on('input',()=>{
  if(rePhone.test(phone.val())){
    phone.css('border','1px solid green')
  }else{
    phone.css('border','1px solid red')
  }
})
pwd.on('input',()=>{
  if(rePwd.test(pwd.val())){
    pwd.css('border','1px solid green')
  }else{
    pwd.css('border','1px solid red')
  }
})
eye.on('click',()=>{
  if(eye.attr('data-id')==1){
    eye.attr('src','../img/eye-k.png')
    eye.attr('data-id','0')
    pwd.attr('type','text')
  }else{
    eye.attr('src','../img/eye.png')
    eye.attr('data-id','1')
    pwd.attr('type','password')
  }
  
})

