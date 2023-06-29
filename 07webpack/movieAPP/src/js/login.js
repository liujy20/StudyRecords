import '@scss/common.scss'
import '@scss/login.scss'
import '@js/resize'

import EYE1 from '@img/eye-k.png'
import EYE2 from '@img/eye.png'

const phone = $(".phone input");
const pwd = $(".pwd input");
const eye = $(".pwd .eyes");
const login = $(".login");
let userInfo = JSON.parse(localStorage.getItem('userInfo'))||[]
console.log(userInfo);
// 验证规则
const rePhone = /^1[3|4|5|7|8]\d{9}$/;
const rePwd = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
// 输入验证
phone.on("input", () => {
  if (rePhone.test(phone.val())) {
    phone.css("border", "1px solid green");
  } else {
    phone.css("border", "1px solid red");
  }
});
// 输入验证
pwd.on("input", () => {
  if (rePwd.test(pwd.val())) {
    pwd.css("border", "1px solid green");
  } else {
    pwd.css("border", "1px solid red");
  }
});
// 切换密码显示
eye.on("click", () => {
  if (eye.attr("data-id") == 1) {
    eye.attr("src", EYE1);
    eye.attr("data-id", "0");
    pwd.attr("type", "text");
  } else {
    eye.attr("src",EYE2);
    eye.attr("data-id", "1");
    pwd.attr("type", "password");
  }
});
// 登录验证
login.on('click',()=>{
  // 验证电话密码格式
  if(rePhone.test(phone.val())&&rePwd.test(pwd.val())){
    // 获取用户信息
    const user = userInfo.filter(item=>phone.val()==item.phone)[0]||{}
    // 验证密码
    if(phone.val()==user.phone&&pwd.val()==user.password){
      alert("登陆成功")
      // 保存登录状态
      sessionStorage.setItem('user',phone.val())
      // 跳转主页
      location.href='index.html'
    }else{
      alert('用户名或密码错误')
    }
  }else{
    alert('用户名或密码格式错误')
  }
})
