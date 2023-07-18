let studentId = localStorage.getItem("user");

main();
function main() {
  render();
  addClick();
  changeImg();
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
    localStorage.removeItem("token");
    location.href = "/html/login.html";
  });
}

function changeImg() {
  $(".bg img").click(function () {
    $(".bg input").click();
  });
  let formData = new FormData();
  $(".bg input").on("change", function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();
    let file = this.files[0];
    if (!/^image\//.test(file.type)) {
      alert("请上传图片");
      return;
    }
    if (file.size > 90000) {
      alert("图片过大");
      return;
    }

    formData.append("icon", file);
    $.ajax({
      url: "http://127.0.0.1:1234/user/upload",
      method: "POST",
      data: formData,
      success: function (data) {
        alert(data.message);
        console.log(data);
        if (data.code == 200) {
          $(".bg img").prop('src',`http://127.0.0.1:1234${data.data}`)
        }//"http://127.0.0.1234/images/1689682689521-å¡.jpg"
      },
      //阻止jQuery传输数据时对数据进行转换处理
      contentType: false,
      processData: false,
      cache: false,
    });
    // return false
  });
}
