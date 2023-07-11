import "@scss/common.scss";
import "@scss/register.scss";
import "@js/resize";
import "@js/jquery-3.5.1.min";

import EYE1 from "@img/eye-k.png";
import EYE2 from "@img/eye.png";

const phone = $(".phone input");
const pwd = $(".pwd input");
const pwd1 = $(".pwd1 input");
const pwd2 = $(".pwd2 input");
const eye = $(".pwd .eyes");
const reg = $(".reg");
let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
// 验证规则
const rePhone = /^1[3|4|5|7|8]\d{9}$/;
const rePwd = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
// 输入框验证
phone.on("input", () => {
  if (rePhone.test(phone.val())) {
    phone.css("border", ".01rem solid green");
  } else {
    phone.css("border", ".01rem solid red");
  }
});
// 输入框验证
pwd1.on("input", () => {
  if (rePwd.test(pwd1.val())) {
    pwd1.css("border", ".01rem solid green");
  } else {
    pwd1.css("border", ".01rem solid red");
  }
});
// 输入框验证
pwd2.on("input", () => {
  if (rePwd.test(pwd2.val())) {
    pwd2.css("border", ".01rem solid green");
  } else {
    pwd2.css("border", ".01rem solid red");
  }
});
// 查看密码
eye.on("click", () => {
  if (eye.attr("data-id") == 1) {
    eye.attr("src", EYE1);
    eye.attr("data-id", "0");
    pwd.attr("type", "text");
  } else {
    eye.attr("src", EYE2);
    eye.attr("data-id", "1");
    pwd.attr("type", "password");
  }
});
// 注册检测
// reg.on("click", () => {
//   // 验证账号格式
//   if (rePhone.test(phone.val())) {
//     let len = userInfo.filter((item) => phone.val() == item.phone).length;
//     // 验证是否重复注册
//     if (!len) {
//       // 验证密码格式
//       if (rePwd.test(pwd1.val())) {
//         // 验证两次输入的密码
//         if (pwd1.val() == pwd2.val()) {
//           userInfo.push({
//             phone: phone.val(),
//             password: pwd1.val(),
//           });
//           // 添加到本地存储
//           localStorage.setItem("userInfo", JSON.stringify(userInfo));
//           alert("注册成功");
//           // 跳转登录页面
//           location.href = "login.html";
//         } else {
//           alert("密码不相同");
//         }
//       } else {
//         alert("密码格式错误");
//       }
//     } else {
//       alert("账号存在");
//     }
//   } else {
//     alert("手机号格式错误");
//   }
// });

reg.on("click", async () => {
  // 验证两次输入的密码
  if (pwd1.val() == pwd2.val()) {
    let { code } = await getPromise(
      "http://127.0.0.1:1122/user/register",
      "POST",
      {
        phone: phone.val(),
        password: pwd.val(),
      }
    );
    if (code == 200) {
      alert("注册成功");
      // 跳转登录页面
      location.href = "login.html";
    } else {
      alert("账号重复");
    }
  } else {
    alert("密码不相同");
  }
});

function getPromise(url, method, data) {
  return new Promise(function (res, rej) {
    $.ajax({
      url,
      method,
      data,
      success: res,
      error: rej,
    });
  });
}
