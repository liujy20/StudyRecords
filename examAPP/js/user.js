let studentId = localStorage.getItem("user");
let data = {};
let path,name,phone,gender;
main();
async function main() {
  await render();
  addClick();
  changeImg();
  change()
}

async function render() {
  data = await getPromiseAuth(
    `http://127.0.0.1:1234/user/getUser?stuId=${studentId}`,
    "GET",
    null
  );
  data = data.data;
  console.log(data);
  name=data.name
  $(".userName").text(name);
  phone=data.phone
  $(".phone").text(phone);
  path=data.avatar
  $(".bg img").prop("src", path);
  gender=data.gender
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
    console.log(file);
    if (!/^image\//.test(file.type)) {
      alert("请上传图片");
      return;
    }
    if (file.size > 90000) {
      alert("图片过大");
      return;
    }

    formData.set("icon", file);
    // console.log(formData.get('icon'));
    $.ajax({
      url: "http://127.0.0.1:1234/user/upload",
      method: "POST",
      data: formData,
      success: function (data) {
        alert(data.message);
        console.log(data);
        path = `http://127.0.0.1:1234${data.data}`;
        if (data.code == 200) {
          $(".bg img").prop("src", path);
        } //"http://127.0.0.1234/images/1689682689521-å¡.jpg"
      },
      //阻止jQuery传输数据时对数据进行转换处理
      contentType: false,
      processData: false,
      cache: false,
    });
    // return false
  });
}

// 修改用户信息
function change() {
  $(".save").click(async function () {
  name = $("main .con .name input").val()||name;
    gender=$('.rad input:checked').prop('id')||gender
    console.log(name,gender);
    let re = await getPromiseAuth(
      `http://127.0.0.1:1234/user/change`,
      "POST",
      {
        tel: data.phone,
        name,
        avatar: path,
        gender,
      }
    );
    console.log(re);
    alert(re.msg)
    location.reload()
    
  });
}
