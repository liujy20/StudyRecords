const nowPlayingList = $(".nowPlaying ul");
const upComingList = $(".upComing ul");
const nav = $("nav");
const menuArr = [
  {
    id: 1,
    name: "首页",
    img: "./img/home.png",
    checkImg: "./img/home2.png",
    flag: false,
  },
  {
    id: 2,
    name: "影院",
    img: "./img/fa.png",
    checkImg: "./img/fang.png",
    flag: false,
  },
  {
    id: 3,
    name: "影片",
    img: "./img/tab3.png",
    checkImg: "./img/tab.png",
    flag: true,
  },
  {
    id: 4,
    name: "我的",
    img: "./img/我的.png",
    checkImg: "./img/我的1.png",
    flag: false,
  },
];
main();

function main() {
  render();
  addListener();
}

function render() {
  renderNowPlaying();
  renderUpComing();
  renderMenu();
}

// 渲染正在热映列表
function renderNowPlaying() {
  let s = "";
  // 遍历电影数据
  nowPlaying.forEach((item) => {
    // 获取中文名
    let name = item.title.split(" ")[0];
    s += `<li data-id=${item.id}>
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
    s += `<li data-id=${item.id}>
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
    location.href = "movieDetail.html?id=" + e.currentTarget.getAttribute('data-id');
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
    location.href = "movieDetail.html?id=" + e.currentTarget.getAttribute('data-id');
  });
}
