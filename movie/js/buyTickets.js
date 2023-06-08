// 获取电影信息
const search = location.search.slice(1).split("&");
const movieId = search[0].split("=")[1];
const cinemaName = decodeURI(search[1].split("=")[1]);
const cinemaId = search[2].split("=")[1];
const movie = nowPlaying.filter((item) => {
  return item.id == movieId;
})[0];

// 电影数据
const img = document.querySelector('.img-bg img')
const movieDesc = document.querySelector(".right .desc");
const movieName = movieDesc.querySelector(".name");
const movieType = movieDesc.querySelector(".type span");
const movieTime = movieDesc.querySelector(".time span");
const yingyuan = document.querySelector(".right .yingyuan span");

// 座位
const wrap = document.querySelector(".seats .wrap");
const seatArr = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [-1, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1],
  [-1, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1],
  [-1, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1],
  [-1, 0, 0, 0, 0, 0, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1],
];
const vote = document.querySelector(".vote ul");
const total = document.querySelector(".line-item span span");
const tips = document.querySelector(".vote span");

// 验证信息
const phone = document.querySelector(".phone");
const psd = document.querySelector(".code");
const confirm = document.querySelector(".confirm");
const get = document.querySelector(".get");
const box = document.querySelector(".box");
// RegExp
const phoneRe = /^1[3456789]\d{9}$/;
const codeArr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
let code = "";
const phoneWarning = document.querySelector(".phone-warning");
const psdWarning = document.querySelector(".psd-warning");

let obj={}

main();

function main() {
  render();
  addListener();
}

function render() {
  renderMsg();
  renderSeat();
  renderTicket(seatIndex());
  seatNum();
  renderRandom();
}

/**
 * 渲染电影数据
 */
function renderMsg() {
  img.src = movie.imgSrc
  let index = movie.title.indexOf(" ");
  let title = movie.title;
  if (index != -1) {
    title = movie.title.slice(0, index);
  }
  movieName.innerHTML = title;
  movieType.innerHTML = movie.movieType;
  movieTime.innerHTML = movie.duration;
  yingyuan.innerHTML = cinemaName;
}

/**
 * 渲染座位
 */
function renderSeat() {
  wrap.innerHTML = "";
  seatArr.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item";
    const num = document.createElement("div");
    num.innerHTML = i + 1;
    num.className = "line-num";
    div.appendChild(num);
    item.forEach((val, j) => {
      const span = document.createElement("span");
      span.className = val == -1 ? "" : `seat${val}`;
      span.setAttribute("data-i-j", `${i}-${j}`);
      div.appendChild(span);
    });
    wrap.appendChild(div);
  });
}

/**
 * 获取电影票位置 返回数组
 */
function seatIndex() {
  let arr = [];
  seatArr.forEach((item, i) => {
    let j = 0;
    item.forEach((val, k) => {
      if (val != -1) {
        j++;
      }
      if (val == 2) {
        arr[arr.length] = `${i + 1}-${j}`;
      }
    });
  });
  return arr;
}
/**
 * 获取电影票数量
 */
function seatNum() {
  let sum = 0;
  seatArr.forEach((item) => {
    item.forEach((val) => {
      if (val == 2) {
        sum++;
      }
    });
  });
  if (sum > 0) {
    tips.style.display = "none";
  } else {
    tips.style.display = "block";
  }
  return sum;
}

/**
 * 渲染电影票
 */
function renderTicket(arr) {
  vote.innerHTML = "";
  // console.log(1);
  arr.forEach((item) => {
    // console.log(item);
    let i = item[0];
    let j = item[2];
    const li = document.createElement("li");
    li.innerHTML = `${i}排${j}座`;
    vote.appendChild(li);
  });
  total.innerHTML = 38 * arr.length;
}

/**
 * 生成验证码
 */
function renderRandom() {
  let str = "";
  for (let i = 0; i < 5; i++) {
    str += codeArr[parseInt(Math.random() * codeArr.length)];
  }
  code = str;
  box.innerHTML = str;
}

function addListener() {
  addChooseSeat();
  addRegExp();
  addSubmit();
}

/**
 * 选择座位
 */
function addChooseSeat() {
  wrap.addEventListener("click", (e) => {
    let ele = e.target;
    if (ele.tagName == "SPAN" && ele.className != "") {
      // console.log(ele);
      const i = ele.getAttribute("data-i-j").split("-")[0];
      const j = ele.getAttribute("data-i-j").split("-")[1];
      switch (seatArr[i][j]) {
        case 0:
          if (seatNum() >= 5) {
            alert("最多购买5张电影票");
            break;
          }
          seatArr[i][j] = 2;
          seatNum(); //取消tips
          renderSeat();
          renderTicket(seatIndex());
          break;
        case 2:
          seatArr[i][j] = 0;
          seatNum(); //取消tips
          renderSeat();
          renderTicket(seatIndex());
          break;
        default:
          break;
      }
    }
  });
}

/**
 * 验证数据
 */
function addRegExp() {
  phone.addEventListener("input", () => {
    if (phoneRe.test(phone.value)) {
      phone.style.border = "1px solid #e5e5e5";
      phoneWarning.style.display = "none";
    } else {
      phone.style.border = "1px solid #f04e39";
      phoneWarning.style.display = "block";
    }
  });
  psd.addEventListener("input", () => {
    let temp = psd.value
      .split("")
      .map((item) => {
        return item.toUpperCase();
      })
      .join("");
    if (temp == code) {
      psd.style.border = "1px solid #e5e5e5";
      psdWarning.style.display = "none";
    } else {
      psd.style.border = "1px solid #f04e39";
      psdWarning.style.display = "block";
    }
  });
}

/**
 * 提交数据
 */
function addSubmit() {
  confirm.addEventListener("click", () => {
    if (total.innerHTML != 0) {
      if (phoneRe.test(phone.value)) {
        let temp = psd.value
          .split("")
          .map((item) => {
            return item.toUpperCase();
          })
          .join("");
        if (temp == code) {
          // location.href=`confirm.html?cinemaId=${cinemaId}&movieId=${movie.id}&cinameName=${cinemaName}&movieName=${movie.title}&seat=${seatIndex()}`
          addOrder();
          location.href=`confirm.html?order=${JSON.stringify(obj)}&cinameName=${cinemaName}&movieName=${movie.title}`
        } else {
          alert("验证码错误");
        }
      } else {
        alert("手机号格式错误");
      }
    } else {
      alert("请选择电影票");
    }
  });
}

/**
 * 添加到订单
 */
function addOrder(){
  let str = seatIndex().map(item=>{
    return `${item.split('-')[0]}行${item.split('-')[1]}列`
  }).join(',')

  obj={
    "orderid":"25888011",
    "userphone":phone.value,
    "movieid":movieId,
    "cinemaid":cinemaId,
    "seats":str,
    "buytime":"2021-08-27",
    "playtime":"2021-08-28",
    "status":"待支付"
  }
  orders.push(obj)
  // console.log(orders);
  // alert('')
}
