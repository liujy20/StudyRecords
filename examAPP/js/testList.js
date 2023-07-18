let studentId = localStorage.getItem("user");
if (!studentId) {
  alert("请先登录");
  location.href = "/html/login.html";
}

let allData = [];
let edData = [];
let ingData = [];
main();

async function main() {
  await getData();
  render();
  addClick();
}

async function getData() {
  allData = await getPromise(
    "http://127.0.0.1:1234/testeds/getAll",
    "GET",
    null
  );
  edData = await getPromise(
    "http://127.0.0.1:1234/testeds/getAllTesteds",
    "POST",
    {
      studentId,
    }
  );
  allData = allData.data;
  edData = edData.data.map((item) => {
    return item.testId;
  });
  // edData=edData.data
  ingData = allData.filter((item) => {
    return (
      edData.find((val) => {
        return val._id == item._id;
      }) == undefined
    );
  });

  console.log(allData, edData, ingData);
}
// 渲染进行中考试列表
function render() {
  renderIngList();
  renderEdList();
}
// 渲染进行中的考试
function renderIngList() {
  let arr = ingData.map((item) => {
    return `<div class="item">
      <img src="../img/Tests/test-1.png" alt="" class="left" />
      <div class="center">
        <div class="test-name">
          <div class="text">${item.title}</div>
          <div class="tag">可参加</div>
        </div>
        <div class="time">${item["start-time"]}~${item["end-time"]}</div>
        <div class="other">
          <img src="../img/Tests/clock.png" alt="" />
          <div class="text">限时${item.durations}分钟</div>
        </div>
      </div>
      <button class="right toTest" data-id='${item._id}'>进入</button>
    </div>`;
  });
  $("main .ing").html('<div class="name">正在进行的考试</div>' + arr.join(""));
}
// 渲染完成考试列表
function renderEdList() {
  let arr = edData.map((item) => {
    return `<div class="item">
      <img src="../img/Tests/test-1.png" alt="" class="left" />
      <div class="center">
        <div class="test-name">
          <div class="text">${item.title}</div>
          <div class="tag">已完成</div>
        </div>
        <div class="time">${item["start-time"]}~${item["end-time"]}</div>
        <div class="other">
          <img src="../img/Tests/clock.png" alt="" />
          <div class="text">限时${item.durations}分钟</div>
        </div>
      </div>
      <button class="right toAnalysis" data-id='${item._id}'>查看</button>
    </div>`;
  });
  $("main .ed").html('<div class="name">已完成的考试</div>' + arr.join(""));
}

function addClick() {
  addMenu();
  addTo();
}
// 添加菜单点击事件
function addMenu() {
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
  // 修改资料
  $(".sub-m .item4").click(function () {
    location.href = "/html/user.html";
  });
  // 退出登录
  $(".sub-m .item4").click(function () {
    localStorage.removeItem('token')
    location.href = "/html/login.html";
  });
}
// 跳转
function addTo() {
  $("main .list button").click(function () {
    let ele = $(this);
    let testId = ele.data("id");
    if (ele.hasClass("toTest")) {
      location.href = `/html/testIndex.html?testId=${testId}`;
    } else {
      location.href = `/html/answer.html?testId=${testId}`;
    }
  });
}
