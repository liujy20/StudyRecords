import "@scss/common.scss";
import "@scss/success.scss";
import "@js/resize";
import { nowPlaying, upComing, opera } from "@js/movieData.js";
// console.log(nowPlaying,upComing);


let ticketInfo = {};
if (localStorage.getItem("ticketInfo")) {
  ticketInfo = JSON.parse(localStorage.getItem("ticketInfo"));
} else {
  location.href = "index.html";
}
// console.log(ticketInfo);

// 电影数据
const movie = nowPlaying.find((item) => {
  return item.id == ticketInfo.movieId;
});
// 影院数据
const cinema = opera.find((item) => {
  return item.id == ticketInfo.cinemaId;
});
// 时间
const userDate = ticketInfo.userDate;
// 座位列表
const seat = ticketInfo.seat;
// 兑换码
const arr=[]

main();
function main() {
  render();
  addListener();
}

function render() {
  renderTitle();
  renderSeat()
  renderDate()
  renderTime()
  renderCode()
  renderQRCode()
}
// 渲染标题
function renderTitle() {
  $(".title").html(`
  <img src="${movie.imgSrc}" alt="">
    <div class="desc">
      <div class="no">订单号： ${ticketInfo.id}</div>
      <div class="name">${movie.title.split(" ")[0]}</div>
      <div class="wrap">
        <div class="region">${cinema.name.split("（")[0]}</div>
        <span> • </span>
        <div class="lang">${movie.language}</div>
      </div>
    </div>`);
}
// 渲染日期
function renderDate() {
  $(".con1 .data .sub").text(`${userDate[0]} ${userDate[1]}`);
}

// 渲染座位相关
function renderSeat() {
  $(".con2 .num .sub").text(seat.length);
  console.log(seat);
  let s = "";
  seat.forEach((item) => {
    s += `<li>${item}</li>`;
  });
  $(".seat ul").html(s);
}

// 渲染时间
function renderTime() {
  $(".con2 .time .sub").text(userDate[2]);
}

// 兑换码
function renderCode(){
  for(let i=0;i<6;i++){
    arr[arr.length]=parseInt(Math.random()*10)
  }
  $('.use .con1 .code').text(arr.join(''))
}

import '@js/jquery.qrcode.min.js'
// 二维码
function renderQRCode(){
  $('.use .con2 .code').qrcode(`ticketDetail.html?code=${arr.join('')}`)
  $('.use .con2 .code').on('click',()=>{
    location.href = `ticketDetail.html?code=${arr.join('')}`
  })
  $('.use .con2 .code canvas').css('wdith', '1.12rem')
  $('.use .con2 .code canvas').css('height', '1.12rem')
}

function addListener() {
  addToIndex()
}

// 返回首页
function addToIndex(){
  $('.submit').on('click',()=>{
    location.href='index.html'
  })
}