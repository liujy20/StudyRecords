// 电影ID
const movieId = location.search.slice(1).split("&")[0].split("=")[1];
// 影院ID
const cinemaId = location.search.slice(1).split("&")[1].split("=")[1];
// 时间
const userDate = decodeURI(
  location.search.slice(1).split("&")[2].split("=")[1]
);
// 电影数据
const movie = nowPlaying.find((item) => {
  return item.id == movieId;
});
// 影院数据
const cinema = opera.find((item) => {
  return item.id == cinemaId;
});
// console.log(cinema);
// 电影名称
const movieName = $("footer .name");
// 电影影院
const cinemaName = $("footer .region");

// 座位
seatArr = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 0],
  [0, 0, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
// 座位排号
lineArr = ["A", "B", "C", "D", "E", "F"];
const ticket = $(".tickets");

// 选择的位置
const ticketXY = $(".choose ul");
// 价格
const price = $(".price .num");

// 购票
const submit = $(".submit");

main();

function main() {
  render();
  addListener();
}

function render() {
  renderDesc();
  renderSeat();
}

// 渲染电影和影院信息
function renderDesc() {
  movieName.text(movie.title.split(" ")[0]);
  cinemaName.text(`${cinema.name} • ${userDate}`);
}
// 渲染座位
function renderSeat() {
  let s = "";
  seatArr.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item";
    let str = "";
    item.forEach((val, j) => {
      // 根据val选择渲染的类型
      if (val == 0) {
        str += `<div class="seat" data-id="${i}-${j}">${lineArr[i]}${
          j + 1
        }</div>`;
      } else if (val == 1) {
        str += `<div class="seat seat1" data-id="${i}-${j}">${lineArr[i]}${
          j + 1
        }</div>`;
      } else {
        str += `<div class="seat seat2" data-id="${i}-${j}">${lineArr[i]}${
          j + 1
        }</div>`;
      }
    });
    // console.log(str);
    s += `<div class="item">${str}</div>`;
  });
  ticket.html(s);
  // console.log(ticket);
  // 添加监听器
  addChooseSeat();
  // 每次渲染完座位后,渲染购买的座位编号和价格
  render_X_Y_Price();
}

// 选择座位
function addChooseSeat() {
  $(".seat").on("click", (e) => {
    let btn = e.currentTarget;
    // 获取座位的坐标
    let i = btn.getAttribute("data-id").split("-")[0];
    let j = btn.getAttribute("data-id").split("-")[1];
    // 根据坐标的值确定是否更改渲染
    if (seatArr[i][j] == 0) {
      // 确定购买的数量
      let num = ticketNum().length;
      // 大于5张无法购买
      if (num < 5) {
        seatArr[i][j] = 1;
        renderSeat();
      } else {
        alert("一次最多购入5张电影票");
      }
    } else if (seatArr[i][j] == 1) {
      seatArr[i][j] = 0;
      renderSeat();
    }
  });
}
// 选择的票的位置
function ticketNum() {
  let allTicket = [];
  // 遍历添加val==1的座位
  seatArr.forEach((item, i) => {
    item.forEach((val, j) => {
      if (val == 1) {
        allTicket[allTicket.length] = lineArr[i] + (j + 1);
      }
    });
  });
  // 返回选择的座位编号的数组
  return allTicket;
}

// 渲染选择的座位的编号和购买价格
function render_X_Y_Price() {
  // 座位位置数组
  let numXY = ticketNum();
  // 座位个数
  let num = numXY.length;
  let s = "";
  numXY.forEach((item) => {
    s += `<li>${item}</li>`;
  });
  ticketXY.html(s);
  // 计算价格
  price.text(`¥${(num * 40).toFixed(2)}`);
}

function addListener() {
  addBack();
  addRoute();
  addSubmit();
}

// 返回上一级
function addBack() {
  $(".back").on("click", () => {
    history.go(-1);
  });
}

// 导航
function addRoute() {
  cinemaName.on("click", function () {
    location.href = "route.html?name=" + cinema.name;
  });
}

// 购票
function addSubmit() {
  submit.on("click", () => {
    if (ticketNum().length) {
      location.href = `confirm.html?movieId=${movieId}&cinemaId=${cinemaId}&seat=${ticketNum().join(
        ","
      )}&userData=${userDate}`;
    }
  });
}
