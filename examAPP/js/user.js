main()
function main(){
  render()
  addClick()
}

function render(){
// TODO:渲染
}
function addClick(){
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
  // 修改资料
  $(".sub-m .item1").click(function () {
    location.href = "/html/user.html";
  });
  // 退出登录
  $(".sub-m .item2").click(function () {
    location.href = "/html/login.html";
  });
}