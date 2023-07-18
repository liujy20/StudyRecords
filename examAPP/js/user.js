let studentId = localStorage.getItem("user");

main();
function main() {
  render();
  addClick();
}

function render() {
  // TODO:渲染
}
function addClick() {
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
  // 首页
  $(".sub-m .item1").click(function () {
    location.href = "/html/index.html";
  });
  // 错题本
  $(".sub-m .item2").click(function () {
    location.href = `/html/wrong.html?studentId=${studentId}`;
  });
  // 收藏夹
  $(".sub-m .item3").click(function () {
    location.href = `/html/collection.html?studentId=${studentId}`;
  });
  // 退出登录
  $(".sub-m .item4").click(function () {
    localStorage.removeItem('token')
    location.href = "/html/login.html";
  });
}
