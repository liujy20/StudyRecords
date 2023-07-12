import "@scss/common.scss";
import "@scss/index.scss";
import "@js/resize";
// import { nowPlaying, upComing, opera } from "@js/movieData.js";
// console.log(nowPlaying,upComing);
let nowPlaying, upComing;

const nowPlayingList = $(".nowPlaying ul");
const upComingList = $(".upComing ul");
const nav = $("nav");

import home1 from "@img/home.png";
import home2 from "@img/home2.png";
import fa1 from "@img/fa.png";
import fa2 from "@img/fang.png";
import tab1 from "@img/tab3.png";
import tab2 from "@img/tab.png";
import me1 from "@img/我的.png";
import me2 from "@img/我的1.png";
import { getPromise, getPromiseAuth, getUserInfo } from "../util/util";
const menuArr = [
  {
    id: 1,
    name: "首页",
    img: home1,
    checkImg: home2,
    flag: false,
  },
  {
    id: 2,
    name: "影院",
    img: fa1,
    checkImg: fa2,
    flag: false,
  },
  {
    id: 3,
    name: "影片",
    img: tab1,
    checkImg: tab2,
    flag: true,
  },
  {
    id: 4,
    name: "我的",
    img: me1,
    checkImg: me2,
    flag: false,
  },
];
main();

async function main() {
  let nowPlayingRes = await getPromise(
    "http://127.0.0.1:1122/movie/findAll?flag=1",
    "GET",
    null
  );
  let upComingRes = await getPromise(
    "http://127.0.0.1:1122/movie/findAll?flag=2",
    "GET",
    null
  );
  nowPlaying = nowPlayingRes.data;
  upComing = upComingRes.data;
  render();
  addListener();
}

function render() {
  renderUser();
  renderNowPlaying();
  renderUpComing();
  renderMenu();
}
// 渲染用户数据
async function renderUser() {
  // if (sessionStorage.getItem("user")) {
  //   const user = $(".top span");
  //   user.text(`您好，${sessionStorage.getItem("user")}！`);
  // } else {
  //   location.href = "login.html";
  // }
  await getUserInfo("http://127.0.0.1:1122/user/getOriginToken","GET",null)
  
}

// 渲染正在热映列表
function renderNowPlaying() {
  let s = "";
  // 遍历电影数据
  nowPlaying.forEach((item) => {
    // 获取中文名
    let name = item.title.split(" ")[0];
    s += `<li data-id=${item._id}>
    <img src="${item.imgSrc}" alt="">
    <div class="name">${name}</div>
  </li>`;
  });
  // 渲染到页面
  nowPlayingList.html(s);
}
// 渲染即将上映列表
function renderUpComing() {
  let s = "";
  // 遍历电影数据
  upComing.forEach((item) => {
    let name = item.title.split(" ")[0];
    s += `<li data-id=${item._id}>
    <img src="${item.imgSrc}" alt="">
    <div class="name">${name}</div>
  </li>`;
  });
  // 渲染到页面
  upComingList.html(s);
}
// 渲染菜单
function renderMenu() {
  const s = menuArr
    .map((item) => {
      // 根据flag选择渲染样式
      if (item.flag == true) {
        return `<div class="item">
    <img src="${item.checkImg}" alt="">
    <div class="name active">${item.name}</div>
  </div>`;
      } else {
        return `<div class="item">
    <img src="${item.img}" alt="">
    <div class="name active">${item.name}</div>
  </div>`;
      }
    })
    .join("");
  nav.html(s);
}
// 添加监听事件
function addListener() {
  addToDetail1();
  addToDetail2();
}
// 添加热映点击事件
function addToDetail1() {
  const item = $(".nowPlaying li");
  console.log();
  item.on("click", (e) => {
    // 获取jquery对象数组下标为0的对象 返回为jquery对象
    // console.log(item.eq(0));
    // console.log(e.currentTarget.id);

    // e.currentTarget 返回js对象
    // e.currentTarget.id获得当前点击元素的id
    // alert(e.currentTarget.getAttribute("data-id"))
    location.href =
      "movieDetail.html?_id=" + e.currentTarget.getAttribute("data-id");
    // console.log(e.currentTarget.getAttribute('data-id'));
  });
}
// 添加即将上映点击事件
function addToDetail2() {
  const item = $(".upComing li");
  console.log();
  item.on("click", (e) => {
    // console.log(e.currentTarget.id);
    // location.href = "movieDetail.html?id=" + e.currentTarget.id;
    // alert(e.currentTarget.getAttribute("data-id"))
    location.href =
      "movieDetail.html?_id=" + e.currentTarget.getAttribute("data-id");
  });
}
