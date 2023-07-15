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

$(".login").click(async function () {
  location.href='/html/index.html'
})
// $(".login").click(async function () {
//   let name = $(".name.itemP input");
//   let pwd = $(".pwd1.itemP input");
  // let res = await getPromise("", "POST", {
//     name:name.val(),
//     pwd:pwd.val()
//   });
//   console.log(res);
//   if (res.code == 200) {
//     alert("登陆成功");
//     // 保存token
//     localStorage.setItem("token", res.token);
//     // 保存登录状态
//     sessionStorage.setItem("user", phone.val());
//     // 跳转主页
//     location.href = "index.html";
//   } else {
//     alert("用户名或密码错误");
//   }
// });
