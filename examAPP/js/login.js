$("main .con .pwd1 img").click(function () {
  let img = $(this);
  console.log(img);
  if (img.data("f") == 0) {
    img.attr("src", "../img/open-eye.png");
    img.data("f", 1);
    img.prev().prop("type", "text");
  } else {
    img.attr("src", "../img/闭眼睛.png");
    img.data("f", 0);
    img.prev().prop("type", "password");
  }
});
$(".register").click(function () {
  location.href = "/html/register.html";
});
const rePhone = /^1[3|4|5|7|8]\d{9}$/;
const rePwd = /^[a-zA-Z][a-zA-Z0-9]{5,11}$/;
let phone = $(".name.itemP input");
let pwd = $(".pwd1.itemP input");
// phone输入验证
phone.on("input", () => {
  if (rePhone.test(phone.val())) {
    phone.css("border", "1px solid green");
  } else {
    phone.css("border", "1px solid red");
  }
});
// pwd1输入验证
pwd.on("input", () => {
  if (rePwd.test(pwd.val())) {
    pwd.css("border", "1px solid green");
  } else {
    pwd.css("border", "1px solid red");
  }
});

// $(".login").click(async function () {
//   location.href='/html/index.html'
// })
$(".login").click(async function () {
  let res = await getPromise("http://127.0.0.1:1234/students/login", "POST", {
    phone: phone.val(),
    password: pwd.val(),
  });
  console.log(res);
  if (res.code == 1) {
    alert("登陆成功");
    // 保存token
    localStorage.setItem("token", res.token);
    // 保存登录状态
    localStorage.setItem("user", res.data._id);
    // 跳转主页
    location.href = "index.html";
  } else {
    alert("用户名或密码错误");
  }
});
