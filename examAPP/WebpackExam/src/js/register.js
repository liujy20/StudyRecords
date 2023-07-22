import '@scss/register.scss'
import '@scss/common.scss'
import '@js/resize.js'
import '@js/register.js'
import {getPromise,getPromiseAuth} from '@util/util.js'

import openEye from "../img/open-eye.png"
import closeEye from "../img/闭眼睛.png"

const rePhone = /^1[3|4|5|7|8]\d{9}$/;
const rePwd = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
const phone = $("#phone");
const pwd1 = $("#pwd1");
const pwd2 = $("#pwd2");

main();

function main() {
  addEye();
  addReg();
  submit();
}

// 密码显示隐藏
function addEye() {
  $("main .con .itemP img").click(function () {
    let img = $(this);
    // console.log(img);
    if (img.data("f") == 0) {
      img.attr("src", openEye);
      img.data("f", 1);
      img.prev().prop("type", "text");
    } else {
      img.attr("src", closeEye);
      img.data("f", 0);
      img.prev().prop("type", "password");
    }
  });
}

// 输入验证
function addReg() {
  // phone输入验证
  phone.on("input", () => {
    if (rePhone.test(phone.val())) {
      phone.css("border", "1px solid green");
    } else {
      phone.css("border", "1px solid red");
    }
  });
  // pwd1输入验证
  pwd1.on("input", () => {
    if (rePwd.test(pwd1.val())) {
      pwd1.css("border", "1px solid green");
    } else {
      pwd1.css("border", "1px solid red");
    }
  });
  // pwd2输入验证
  pwd2.on("input", () => {
    if (rePwd.test(pwd2.val())) {
      pwd2.css("border", "1px solid green");
    } else {
      pwd2.css("border", "1px solid red");
    }
  });
}

function submit() {
  $(".login").click(function () {
    location.href = "/html/login.html";
  });
  $(".register").click(async function () {
    if (
      rePwd.test(pwd2.val()) &&
      rePhone.test(phone.val()) &&
      rePwd.test(pwd1.val())
    ) {
      if (pwd1.val() == pwd2.val()) {
        let res = await getPromise(
          "http://127.0.0.1:1234/students/register",
          "POST",
          {
            phone:phone.val(),
            password:pwd1.val(),
          }
        );
        if(res.code==200){
          alert('注册成功')
          location.href='/html/login.html'
        }else{
          alert('注册失败,请重新注册')
        }
      } else {
        alert("两次密码输入不同");
      }
    } else {
      alert("请输入正确格式的账号和密码");
    }
  });
}
