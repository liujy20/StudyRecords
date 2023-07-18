let search = location.search.slice(1).split("&");
let testId = search[0].split("=")[1];
let stuId = search[1].split("=")[1];
let pointId = search[2].split("=")[1];

let data = {};
let exerciseArr = [];
let completeObj = {};
let collection = [];
let testTime = 0;
let currentTopicId = "";
let currentTopic = {};

main();

async function main() {
  await getData();
  render();
  addClick();
}

async function getData() {
  // 获取试题
  data = await getPromise("http://127.0.0.1:1234/tests/beginExam", "POST", {
    _id: testId,
  });
  data = data.data[0];
  console.log(data);
  ({ exerciseId: exerciseArr } = data);
  // console.log(exerciseArr);
  // 完成列表
  if (Object.keys(completeObj).length == 0) {
    exerciseArr.forEach((item) => {
      completeObj[`${item._id}`] = [];
    });
  }
  console.log(completeObj);
  // 获取收藏试题
  collection = await getPromise(
    "http://127.0.0.1:1234/collections/getCollection",
    "GET",
    {
      studentId: stuId,
    }
  );
  collection = collection.data;
  console.log("collection", collection);
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
  console.log("exerciseArr", exerciseArr);
}

function render() {
  renderBack();
  timing();
  renderList();
  initTopic();
  renderCurrentItem();
  renderTopic();
}
// 标题
function renderBack() {
  $("header .text").text(data.title);
  $("header .text").click(function () {
    history.go(-1);
  });
  $("footer .all").text(exerciseArr.length);
}
// 计时器
function timing() {
  let duration = data.durations;
  let allSecond = (duration - 0) * 60;
  console.log(allSecond);
  setInterval(function () {
    testTime++;
    let second = allSecond - testTime;
    let s = second % 60;
    let m = ((second - s) / 60) % 60;
    let h = (second - s - m * 60) / 60 / 60;
    $("header .time").text(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`
    );
    if (second==0) {
      // 跳转
      submit()
    }
  }, 1000);
}
// 题目列表
function renderList() {
  let s1 = "",
    s2 = "";
  exerciseArr.forEach((item, index) => {
    let isComplete = false;
    if (completeObj[`${item._id}`].length != 0) {
      isComplete = true;
    }
    if (index < 20) {
      s1 += `<li class="${isComplete ? "complete" : ""}  ${
        item.collected ? "collected" : ""
      }" data-id='${item._id}' data-index="${index}">${index + 1}</li>`;
    } else {
      s2 += `<li class="${isComplete ? "complete" : ""}  ${
        item.collected ? "collected" : ""
      }" data-id='${item._id}' data-index="${index}">${index + 1 - 20}</li>`;
    }
  });
  // console.log(s1);
  $("footer .bottom .choice1 ul").html(s1);
  $("footer .bottom .choice2 ul").html(s2);
  renderCurrentItem();
}
// 初始化
function initTopic() {
  currentTopicId = $("footer .bottom .choice1 li")[0].getAttribute("data-id");
  currentTopic = $($("footer .bottom .choice1 li")[0]);
  // console.log(currentTopic,currentTopicId);
}

// 渲染正在查看题目
function renderCurrentItem() {
  $(`footer .bottom li`).removeClass("current");
  $(`footer .bottom li[data-id='${currentTopicId}']`).addClass("current");
}

// 渲染写过的题目
function renderComplete() {
  let keyArr = Object.keys(completeObj);
  keyArr.forEach((item) => {
    if (completeObj[item].length != 0) {
      $(`footer [data-id='${item}']`).addClass("complete");
    }
  });
}

// 渲染试题
function renderTopic() {
  let [topic] = exerciseArr.filter((item) => {
    return item._id == currentTopicId;
  });
  console.log(topic);
  $("main .tit .topic").text(topic.topics);
  // 获取答案
  let ansArr = completeObj[currentTopicId];
  let flag;
  console.log("ansArr", ansArr);
  // 渲染选项
  let Tarr = topic.options.map((item, index) => {
    switch (index) {
      case 0:
        flag = ansArr.includes(0);
        return `<div class="option ${flag ? "active" : ""}" data-ans=0>
          <input type="${
            topic.type == 0 ? "radio" : "checkbox"
          }" id="a" name="topic" ${flag ? "checked" : "disabled"} />
          <label for="a">A. ${item}</label>
        </div>`;
      case 1:
        flag = ansArr.includes(1);
        return `<div class="option ${flag ? "active" : ""}" data-ans=1>
          <input type="${
            topic.type == 0 ? "radio" : "checkbox"
          }" id="b" name="topic" ${flag ? "checked" : "disabled"} />
          <label for="b">B. ${item}</label>
        </div>`;
      case 2:
        flag = ansArr.includes(2);
        return `<div class="option ${flag ? "active" : ""}" data-ans=2>
          <input type="${
            topic.type == 0 ? "radio" : "checkbox"
          }" id="c" name="topic" ${flag ? "checked" : "disabled"}/>
          <label for="c">C. ${item}</label>
        </div>`;
      case 3:
        flag = ansArr.includes(3);
        return `<div class="option ${flag ? "active" : ""}" data-ans=3>
          <input type="${
            topic.type == 0 ? "radio" : "checkbox"
          }" id="d" name="topic" ${flag ? "checked" : "disabled"} />
          <label for="d">D. ${item}</label>
        </div>`;

      default:
        break;
    }
  });
  $("main .options").html(Tarr.join(""));
}

function addClick() {
  openList();
  chooseTopic();
  collect();
  optionsClick();
  toNext();
  addSubmit();
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

// 选择题目
function chooseTopic() {
  $(".bottom .choice ul li").click(function () {
    // console.log(this);
    let ele = $(this);
    currentTopic = ele;
    // console.log(currentTopic);
    currentTopicId = ele.data("id");
    renderTopic();
    renderCurrentItem();
    $("footer .top .now").text(currentTopic.data("index") + 1);
    $("footer .top .num").click();
    optionsClick();
  });
}

// 添加收藏
function collect() {
  $("footer .top .collection").click(async function () {
    currentTopic = $(`footer .bottom [data-id="${currentTopicId}"]`);
    if (currentTopic.hasClass("collected")) {
      let res = await getPromise(
        "http://127.0.0.1:1234/collections/delCollection",
        "GET",
        {
          studentId: stuId,
          exerciseId: currentTopicId,
        }
      );
      if (res.code == 200) {
        await getData();
        renderList();
        chooseTopic();
        console.log("删除");
      }
    } else {
      let res = await getPromise(
        "http://127.0.0.1:1234/collections/addCollection",
        "GET",
        {
          studentId: stuId,
          exerciseId: currentTopicId,
        }
      );
      if (res.code == 200) {
        await getData();
        renderList();
        chooseTopic();
        console.log("添加");
      }
    }
  });
}

// 选项选择
function optionsClick() {
  $(".options .option").click(function () {
    let ele = $(this);
    if (ele.find("input").attr("type") == "radio") {
      completeObj[currentTopicId] = [ele.data("ans")];
      renderList();
      renderTopic();
      chooseTopic();
      optionsClick();
    } else {
      if (ele.find("input").prop("checked")) {
        console.log(1111);
        completeObj[currentTopicId] = completeObj[currentTopicId].filter(
          (item) => {
            return item != ele.data("ans");
          }
        );
        renderList();
        renderTopic();
        chooseTopic();
        optionsClick();
      } else {
        completeObj[currentTopicId].push(ele.data("ans"));
        renderList();
        renderTopic();
        chooseTopic();
        optionsClick();
      }
    }
  });
}

// 下一题
function toNext() {
  $(".next-topic").click(function () {
    if (
      $(`footer ul [data-id='${currentTopicId}']`).data("index") <
      exerciseArr.length - 1
    ) {
      $(`footer ul [data-id='${currentTopicId}']`).next().click();
      console.log($(`footer ul [data-id='${currentTopicId}']`));
      $("footer .top .num").click();
    } else {
      $("footer .submit").click();
    }
  });
}
// 绑定提交
function addSubmit() {
  $("footer .submit").click(function () {
    let ans = Object.values(completeObj).filter((item) => {
      return item.length == 0;
    });
    if (ans.length != 0) {
      $(".confirm-submit").css("transform", "scale(1)");
      $(".top-mask").css("opacity", "1");
    }else{
      submit()
    }
  });
  $(".cancel").click(function () {
    $(".confirm-submit").css("transform", "scale(0)");
    $(".top-mask").css("opacity", "0");
  });
  $(".confirm").click(function () {
    submit();
  });
}

// 提交
async function submit() {
  $(".cancel").click()
  let score=0
  let tp=0
  let all=0
  let ansArr=exerciseArr.map(item=>{
    let id= item._id
    // 答案相同
    if(completeObj[id].sort().toString()==item.answer.toString()){
      score+=item.score
      tp++;
    }
    all++;
    return completeObj[id].sort()
  })
  console.log({
    testId:testId,
    studentId:stuId,
    typeId:pointId,
    answers:ansArr,
    score:score,
    accuracy:(tp/all*100).toFixed(2)+'%',
    durations:testTime
  });
  let res = await getPromiseAuth("http://127.0.0.1:1234/testeds/addTesteds", "POST", {
    testId:testId,
    studentId:stuId,
    typeId:pointId,
    answers:JSON.stringify(ansArr),
    score:score,
    accuracy:(tp/all*100).toFixed(2)+'%',
    durations:testTime
  });
  console.log(res);
  if(res.code==200){
    location.href=`/html/testEnd.html?testId=${testId}`
  }
}
