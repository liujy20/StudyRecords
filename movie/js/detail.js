// 获取电影ID
const id = location.search.slice(1).split("=")[1];
const movie = nowPlaying.filter((item) => {
  return item.id == id;
})[0];
// console.log(movie);
const img = document.querySelector(".img-bg img");
const desc = document.querySelector(".des");
const comment = document.querySelector(".comment");

// 路径
const path = document.querySelector(".path");

const story = document.querySelector(".desc");
// 购票
let toPay

// 导航
const nav = document.querySelector(".content .navs");
const container1 = document.querySelector(".left .container1");
const container2 = document.querySelector(".left .container2");
// console.log(container1, container2);

// 评价
const mark = document.querySelector(".mark");

// 导演1
const director1 = container1.querySelector(".director");
// 演员1
const actor1 = container1.querySelector(".actors ul");
// 导演2
const director2 = container2.querySelector(".director");
// 演员2
const actor2 = container2.querySelector(".actors ul");

// 评论按钮
const btn = container1.querySelector(".title button");
// 评论窗口
const commentBox = document.querySelector(".rate");
// 评分
const starList = commentBox.querySelector("ul");
const text = commentBox.querySelector("textarea");
const close = commentBox.querySelector(".close");

main();

function main() {
  render();
  addListener();
}

function render() {
  renderDesc();
  renderComment();
  renderPath();
  renderStory();
  renderMark();
  renderActors();
}

/**
 * 加载简介
 */
function renderDesc() {
  img.src = movie.imgSrc;
  let index = movie.title.indexOf(" ");
  const title1 = movie.title.slice(0, index);
  const title2 = movie.title.slice(index + 1);
  const release = movie.release.split(" ").join("<br>");
  let s = `
  <div class="title1">${title1}</div>
  <div class="title2">${title2}</div>
  <div class="movieType space">${movie.movieType}</div>
  <div class="con space">
    <span class="region">${movie.region}</span>/<span class="duration"
      >${movie.duration}</span
    >
  </div>
  <div class="release space">${release}</div>
  <div class="btns">
    <div class="line">
      <button class="like">
        <i></i>
        想看
      </button>
      <button class="toScore">
        <i></i>
        评分
      </button>
    </div>
    <button class="pay">特惠购票</button>
  </div>`;

  desc.innerHTML = s;
  toPay = document.querySelector(".des .pay");
  addPay();
}

/**
 * 购买电影票
 */
function addPay() {
  toPay.addEventListener("click", () => {
    location.href = `cinema.html`;
  });
}

/**
 * 加载评价
 */
function renderComment() {
  let s = `<div class="title1">蜗牛口碑</div>
  <div class="con1">
    <div class="score">${movie.score}</div>
    <div class="sub-con">
      <div class="star">
        <ul>
          <li class="item full"></li>
          <li class="item full"></li>
          <li class="item full"></li>
          <li class="item full"></li>
          <li class="item null"></li>
        </ul>
      </div>
      <div class="num">13.3万人评分</div>
    </div>
  </div>
  <div class="title2">累计票房</div>
  <div class="con2">
    <span>2.38</span>
    亿
  </div>`;

  comment.innerHTML = s;
}

/**
 * 加载路径
 */
function renderPath() {
  let index = movie.title.indexOf(" ");
  const title = movie.title.slice(0, index);
  path.innerHTML = `蜗牛电影 > 电影 > ${title}`;
}

/**
 * 加载剧情
 */
function renderStory() {
  story.innerHTML = movie.desc;
}

/**
 * 加载评论
 */
function renderMark() {
  mark.children[0].innerHTML = "";
  movie.comments.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = `
    <div class="mark-header">
      <img src="./img/avator02.png" alt="" />
      <div class="info">
        <div class="u-name">Tenten</div>
        <div class="mark-time">
          23小时前
          <i class="star y-l"></i>
          <i class="star y-r"></i>
          <i class="star y-l"></i>
          <i class="star y-r"></i>
          <i class="star y-l"></i>
          <i class="star y-r"></i>
          <i class="star y-l"></i>
          <i class="star y-r"></i>
          <i class="star y-l"></i>
          <i class="star w-r"></i>
        </div>
      </div>
      <i class="icon-like"></i>
      <div class="like">158</div>
    </div>
    <div class="mark-body">
      <p>${item}</p>
    </div>`;
    mark.children[0].appendChild(li);
  });
}

/**
 * 加载导演演员
 */
function renderActors() {
  let arr = [];
  let actors = movie.actors.split(" / ");
  // con1
  director1.children[2].innerHTML = movie.director;
  arr = actors;
  if (actors.length > 4) {
    arr.length = 4;
  }
  actor1.innerHTML = "";
  arr.forEach((item, index) => {
    let li = document.createElement("li");
    if (index == 0) {
      li.innerHTML = `
      <div class="tit">演员</div>
      <img src="./img/actor-${index + 1}.png" alt="" />
      <div class="name">${item}</div>
      <div class="play">饰：郑宇星</div>`;
    } else {
      li.innerHTML = `<div class="tit"></div>
      <img src="./img/actor-${index + 1}.png" alt="" />
      <div class="name">${item}</div>
      <div class="play">饰：郑宇星</div>`;
    }
    actor1.appendChild(li);
  });
  // con2
  director2.children[2].innerHTML = movie.director;
  actor2.innerHTML = "";
  actors.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
    <img src="./img/actor-${index + 1}.png" alt="" />
    <div class="name">${item}</div>
    <div class="play">饰：郑宇星</div>`;
    actor2.appendChild(li);
  });
}

/**
 * 添加监听事件
 */
function addListener() {
  addChangeNav();
  addComment();
  addClose();
  addSubmit();
}

/**
 * 修改导航
 */
function addChangeNav() {
  nav.addEventListener("click", (e) => {
    let ele = e.target;
    // console.log(nav.children[1]);
    if (ele == nav.children[0]) {
      nav.children[0].className = "nav1 active";
      nav.children[1].className = "nav2";
      openContainer(0);
    } else if (ele == nav.children[1]) {
      nav.children[0].className = "nav1";
      nav.children[1].className = "nav2 active";
      openContainer(1);
    }
  });
}

/**
 * 切换内容
 */
function openContainer(num) {
  if (num) {
    container2.style.display = "block";
    container1.style.display = "none";
  } else {
    container1.style.display = "block";
    container2.style.display = "none";
  }
}

/**
 * 添加评论
 */
function addComment() {
  btn.addEventListener("click", () => {
    commentBox.style.display = "block";
  });
  let children = Array.from(starList.children);
  starList.onclick = function (e) {
    // e.stopPropagation();
    // console.log(e.offsetX);
    children.forEach((item, index) => {
      // console.log(item.offsetLeft);
      // console.log(e.offsetX);
      if (item.offsetLeft < e.offsetX) {
        item.className = `item y-${index % 2 ? "r" : "l"}`;
      } else {
        item.className = `item w-${index % 2 ? "r" : "l"}`;
      }
    });
  };
}

/**
 * 关闭评论窗口
 */
function addClose() {
  close.onclick = function () {
    commentBox.style.display = "none";
  };
}

/**
 * 提交评论
 */
function addSubmit() {
  commentBox.addEventListener("keydown", (e) => {
    let children = Array.from(starList.children);
    let arr = children.map((item) => {
      return `<i class="${item.className}"></i>`;
    });
    // enter键
    if (e.keyCode == 13) {
      let li = document.createElement("li");
      li.innerHTML = `
      <li>
        <div class="mark-header">
          <img src="./img/avator02.png" alt="" />
          <div class="info">
            <div class="u-name">Tenten</div>
            <div class="mark-time">
              刚刚
              ${arr.join("")}
            </div>
          </div>
          <i class="icon-like"></i>
          <div class="like">0</div>
        </div>
        <div class="mark-body">
          <p>${text.value}</p>
        </div>
      </li>`;
      mark.children[0].insertBefore(li, mark.children[0].firstElementChild);
      close.onclick();
    }
  });
}
