let testId = location.search.slice(1).split("=")[1];
// console.log(testId);
let studentId=localStorage.getItem('user')
// let studentId = "62a2ae13f5f8279d44e4f146";
let TopicId = "";
let currentTopic = {};
let data = {};
let collection = [];
let exerciseArr = [];
let Sarr = [];
let Darr = [];

main();

async function main() {
  await getData();
  render();
  addClick();
}

// 获取试题集
async function getData() {
  // 获取试题
  data = await getPromise("http://127.0.0.1:1234/testeds/getAnalysis", "GET", {
    studentId,
    testId,
  });
  data = data.data;
  console.log(data);
  // 获取收藏试题
  collection = await getPromise(
    "http://127.0.0.1:1234/collections/getCollection",
    "GET",
    {
      studentId,
    }
  );
  collection = collection.data;
  // console.log(collection);
  exerciseArr = data.testId.exerciseId;
  // 试题对象添加收藏属性
  exerciseArr = exerciseArr.map((item) => {
    item.collected = false;
    // 收藏中存在试题
    if (
      collection.find((val) => {
        return val.exerciseId == item._id;
      }) != undefined
    ) {
      item.collected = true;
    }
    return item;
  });
  console.log(exerciseArr);
  Sarr = exerciseArr.filter((item) => {
    return item.type == 0;
  });
  Darr = exerciseArr.filter((item) => {
    return item.type == 1;
  });
}

function render() {
  renderList();
  initTopic();
}

// 初始化
function initTopic() {
  let ele = $("footer .bottom .choice1 li")[0];
  ele = $(ele);
  currentTopic = ele;
  // console.log(ele);
  TopicId = ele.data("id");
  let arr = ele.data("index").split("-");
  renderTopic(...arr);
  // console.log(TopicId);
}

// 渲染错题列表
function renderList() {
  let { answers } = data;
  // 单选题
  let s = "";
  Sarr.forEach((item, index) => {
    s += `<li class="${item.answer.toString() == answers[index] ? "t" : "f"} ${
      item.collected ? "collected" : ""
    }" data-index="1-${index}" data-id='${item._id}'>${index + 1}</li>`;
  });
  // console.log(s);
  $(".bottom .choice1 ul").html(s);
  // ==================================================
  // 多选题
  s = "";
  Darr.forEach((item, index) => {
    s += `<li class="${
      item.answer.toString() == answers[index + 20] ? "t" : "f"
    } ${item.collected ? "collected" : ""}" data-index="2-${index}" data-id='${
      item._id
    }'>${index + 1}</li>`;
  });
  // console.log(s);
  $(".bottom .choice2 ul").html(s);

  $("footer .top .all").text(answers.length);
  chooseTopic()
}

// 渲染题目
function renderTopic(f, i) {
  let t = {};
  if (f == 1) {
    t = Sarr[i];
  } else {
    t = Darr[i];
    i = i - 0 + 20;
  }
  $("main .tit .topic").text(t.topics);
  // 渲染选项
  let Tarr = t.options.map((item, index) => {
    switch (index) {
      case 0:
        flag = t.answer.includes(0);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${f == 1 ? "radio" : "checkbox"}" id="a" name="topic" ${
          flag ? "checked" : "disabled"
        } />
          <label for="a">A. ${item}</label>
        </div>`;
      case 1:
        flag = t.answer.includes(1);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${f == 1 ? "radio" : "checkbox"}" id="b" name="topic" ${
          flag ? "checked" : "disabled"
        } />
          <label for="b">B. ${item}</label>
        </div>`;
      case 2:
        flag = t.answer.includes(2);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${f == 1 ? "radio" : "checkbox"}" id="c" name="topic" ${
          flag ? "checked" : "disabled"
        }/>
          <label for="c">C. ${item}</label>
        </div>`;
      case 3:
        flag = t.answer.includes(3);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${f == 1 ? "radio" : "checkbox"}" id="d" name="topic" ${
          flag ? "checked" : "disabled"
        } />
          <label for="d">D. ${item}</label>
        </div>`;

      default:
        break;
    }
  });
  $("main .options").html(Tarr.join(""));
  // 渲染答案
  $("main .ans").html(`
    <div class="tip">
      <img src="../img/解析_03.png" alt="">
      <div class="text">${
        t.answer.toString() == data.answers[i] ? "答对了" : "答错了"
      }</div>
    </div>
    <div class="t-ans">
      考生答案：
      <span class="f">${indexToLetter(data.answers[i]).join(" ")}</span>
    </div>
    <div class="t-ans">
      正确答案：
      <span>${indexToLetter(t.answer).join(" ")}</span>
    </div>
    <div class="more">
      答案解析：${t.analysis}
    </div>
  `);
}
// 答案索引转换为选项
function indexToLetter(arr) {
  let letter = ["A", "B", "C", "D"];
  // console.log(arr);
  let nArr = arr.map((item) => {
    return letter[item];
  });
  return nArr;
}

function addClick() {
  openList();
  chooseTopic();
  collect();
}
// 打开错题列表
function openList() {
  $("footer .top .num").click(function () {
    let btn = $(this);
    if (btn.data("f") == 0) {
      $("footer .bottom").css("height", "8.9rem");
      btn.data("f", 1);
      $(".mask").css("opacity", "1");
    } else {
      $("footer .bottom").css("height", "0rem");
      btn.data("f", 0);
      $(".mask").css("opacity", "0");
    }
  });
}

// 选择错题
function chooseTopic() {
  $(".bottom .choice ul li").click(function () {
    // console.log(this);
    let ele = $(this);
    currentTopic = ele;
    // console.log(currentTopic);
    TopicId = ele.data("id");
    let arr = ele.data("index").split("-");
    renderTopic(...arr);
    $("footer .top .now").text((arr[0] - 1) * 20 + (arr[1] - 0 + 1));
    $("footer .top .num").click();
  });
}

// 添加收藏
function collect() {
  $("footer .top .collection").click(async function () {
    currentTopic=$(`footer .bottom [data-index="${currentTopic.data('index')}"]`)
    if (currentTopic.hasClass("collected")) {
      let res = await getPromise(
        "http://127.0.0.1:1234/collections/delCollection",
        "GET",
        {
          studentId,
          exerciseId: TopicId,
        }
      );
      if (res.code == 200) {
        await getData();
        $("footer .top .collection").remove('click')
        renderList();
        console.log('删除');
      }
    } else {
      let res = await getPromise(
        "http://127.0.0.1:1234/collections/addCollection",
        "GET",
        {
          studentId,
          exerciseId: TopicId,
        }
      );
      if (res.code == 200) {
        await getData();
        $("footer .top .collection").remove('click')
        renderList();
        console.log("添加");
      }
    }
  });
}
