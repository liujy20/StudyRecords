let testId = location.search.slice(1).split("=")[1];
console.log(testId);

let studentId = "62a2ae13f5f8279d44e4f146";
let data = {};
let Sarr = [];
let Darr = [];

main();

async function main() {
  getData()
  render();
  addClick();
}

async function getData() {
  data = await getPromise("http://127.0.0.1:1234/testeds/getAnalysis", "GET", {
    studentId,
    testId,
  });
  data = data.data;
  console.log(data);
  Sarr = data.testId.exerciseId.filter((item) => {
    return item.type == 0;
  });
  Darr = data.testId.exerciseId.filter((item) => {
    return item.type == 1;
  });
}

function render() {
  renderList();
  // renderTopic(0)
}

// 渲染错题列表
function renderList() {
  // Sarr.forEach()
  $('.bottom .choice1 ul')
}

function addClick() {
  openList();
}
// 打开错题列表
function openList() {
  $("footer .top .num").click(function () {
    let btn = $(this);
    if (btn.data("f") == 0) {
      $("footer .bottom").css("height", "8.9rem");
      btn.data("f", 1);
      $(".mask").css("display", "block");
    } else {
      $("footer .bottom").css("height", "0rem");
      btn.data("f", 0);
      $(".mask").css("display", "none");
    }
  });
}
