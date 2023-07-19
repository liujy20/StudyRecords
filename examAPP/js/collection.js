let studentId = localStorage.getItem("user");
let collection = [];
let currentTopicIndex = 0;
let currentTopicId = "";
let allLength = 0;

main();

async function main() {
  await getData();
  render(currentTopicIndex);
  addClick();
}

async function getData() {
  // 获取收藏试题
  collection = await getPromise(
    "http://127.0.0.1:1234/collections/getCollection",
    "GET",
    {
      studentId,
    }
  );
  collection = collection.data;
  console.log(collection);
  allLength = collection.length;
  if(!allLength){
    alert('收藏夹为空')
    history.go(-1)
  }
  $("footer .top .all").text(allLength);
}

// 渲染题目
function render(index) {
  let t = collection[index].exerciseId;
  currentTopicId = collection[index].exerciseId._id;
  // 渲染题目
  $("main .tit .type").text(t.type == 0 ? "单选题" : "多选题");
  $("main .tit .topic").text(t.topics);
  // 渲染选项
  let Tarr = t.options.map((item, index) => {
    switch (index) {
      case 0:
        flag = t.answer.includes(0);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${
            t.type == 0 ? "radio" : "checkbox"
          }" id="a" name="topic" ${flag ? "checked" : "disabled"} disabled/>
          <label for="a">A. ${item}</label>
        </div>`;
      case 1:
        flag = t.answer.includes(1);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${
            t.type == 0 ? "radio" : "checkbox"
          }" id="b" name="topic" ${flag ? "checked" : "disabled"} disabled/>
          <label for="b">B. ${item}</label>
        </div>`;
      case 2:
        flag = t.answer.includes(2);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${
            t.type == 0 ? "radio" : "checkbox"
          }" id="c" name="topic" ${flag ? "checked" : "disabled"} disabled/>
          <label for="c">C. ${item}</label>
        </div>`;
      case 3:
        flag = t.answer.includes(3);
        return `<div class="option ${flag ? "active" : ""}">
          <input type="${
            t.type == 0 ? "radio" : "checkbox"
          }" id="d" name="topic" ${flag ? "checked" : "disabled"} disabled/>
          <label for="d">D. ${item}</label>
        </div>`;

      default:
        break;
    }
  });
  $("main .options").html(Tarr.join(""));
  // 渲染答案
  $("main .ans").html(`
    
    <div class="t-ans">
      正确答案：
      <span>${indexToLetter(t.answer).join(" ")}</span>
    </div>
    <div class="more">
      答案解析：${t.analysis ? t.analysis : "略"}
    </div>
  `);
  $("footer .top .now").text(currentTopicIndex + 1);
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
  next();
  prev();
  back();
  delTopic();
}
// 下一题
function next() {
  $("header .next").click(function () {
    if (currentTopicIndex < allLength - 1) {
      render(++currentTopicIndex);
    }
  });
}
// 上一题
function prev() {
  $("header .prev").click(function () {
    if (currentTopicIndex > 0) {
      render(--currentTopicIndex);
    }
  });
}
// 返回
function back() {
  $("header img").click(function () {
    history.go(-1);
  });
  $(".submit").click(function () {
    history.go(-1);
  });
}

// 删除
function delTopic() {
  $("footer .del").click(async function () {
    console.log(studentId,currentTopicId);
    let res = await getPromise(
      "http://127.0.0.1:1234/collections/delCollection",
      "GET",
      {
        studentId,
        exerciseId: currentTopicId,
      }
    );
    
    await getData();
    if(currentTopicIndex==allLength){
      currentTopicIndex=allLength-1
    }
    render(currentTopicIndex);
  });
}
