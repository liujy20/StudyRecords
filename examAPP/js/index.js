let studentId = localStorage.getItem("user");
let data = {};

main();

async function main() {
  await render();
  addClick();
}

async function render() {
  data = await getPromiseAuth(
    "http://127.0.0.1:1234/students/indextypes",
    "GET",
    null
  );
  data = data.data;
  console.log(data);
  let arr = data.map((item) => {
    return `<div class="item">
    <img src="${item.icon}" alt="" class="item" />
    <div class="tit">${item.type}</div>
  </div>`;
  });
  $("nav").html(arr.join(""));
}

function addClick() {
  // 考试跳转
  $("nav .item").click(function () {
    location.href = "/html/testList.html";
  });
  // 开启菜单
  $("header .menu").click(function () {
    let ele = $(".sub-m");
    ele.css("transform", "scale(1)");
    // $('.mask').css('display','block')
    $(".mask").css("opacity", "1");
  });
  // 关闭菜单
  $(".sub-m .close").click(function () {
    let ele = $(".sub-m");
    ele.css("transform", "scale(0)");
    $(".mask").css("opacity", "0");
    // $('.mask').css('display','none')
  });
  // 错题本
  $(".sub-m .item1").click(function () {
    location.href = `/html/wrong.html?studentId=${studentId}`;
  });
  // 收藏夹
  $(".sub-m .item2").click(function () {
    location.href = `/html/collection.html?studentId=${studentId}`;
  });
  // 修改资料
  $(".sub-m .item3").click(function () {
    location.href = "/html/user.html";
  });
  // 退出登录
  $(".sub-m .item4").click(function () {
    localStorage.removeItem('token')
    location.href = "/html/login.html";
  });
}
