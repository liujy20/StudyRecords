// 获取传入的数据
function getUserInfo(key) {
  let val;
  const search = location.search.slice(1);
  search.split("&").forEach((item) => {
    const temp = item.split("=");
    if (temp[0] == key) {
      // console.log(1);
      val = temp[1];
    }
  });
  return val;
}
const id = getUserInfo("id");
console.log("id=", id);
if (!id) {
  location.href = "login.html";
}
// 背景图片
const headerImg = $("header img");
const movieDesc = $(".movie");
const cinemaList = $(".cinemaList");
// 电影
let movieData = {};
// 影院id
let cinemaId = 0;
// 视频
const video = document.querySelector("video");

main();
function main() {
  render();
  addListener();
  videoTimeSave();
}
function render() {
  renderDesc();
  renderCinema();
  renderDetial();
}
// 渲染电影介绍
function renderDesc() {
  // 获取id指向的对象数据
  let movie = nowPlaying.filter((item) => {
    return id == item.id;
  })[0];
  // console.log(movie);
  // 如果为空.说明id在即将上映数组中
  if (!movie) {
    movie = upComing.filter((item) => {
      return id == item.id;
    })[0];
  }
  movieData = movie;
  // console.log(movie);
  // 修改背景图
  headerImg.attr("src", movie.imgSrc);
  // 渲染传入电影的数据
  movieDesc.html(`<img src="${movie.imgSrc}" alt="">
  <div class="desc">
    <div class="tit">${movie.title.split(" ")[0]}</div>
    <div class="name item">
      类型
      <span>${movie.movieType}</span>
    </div>
    <div class="duration item">
      片长
      <span>${movie.duration}</span>
    </div>
    <div class="score item">
      评分
      <span>${movie.score}</span>
    </div>
  </div>`);
}
// 渲染电影列表
function renderCinema() {
  const arr = opera.filter((item) => {
    return item.movies.includes(id);
  });
  // console.log(arr);
  let s = "";
  arr.forEach((item) => {
    s += `<li>
    <div class="name">${item.name}</div>
    <div class="address">
      <i></i>
      54.0km • ${item.address}
    </div>
    <div class="price">
      英文 2D • ￥30.00
    </div>
    <div class="timer" data-id=${item.id}>
      <div class="i">11:00</div>
      <div class="i">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
    </div>
  </li>`;
  });
  // console.log(s);
  cinemaList.html(s);
}
// 渲染简介
function renderDetial() {
  $(".detail p").text(movieData.desc);
}

function addListener() {
  addChangeNav();
  addTimeChoose();
  addSubmit();
}
// 选择导航
function addChangeNav() {
  $("nav .item").on("click", (e) => {
    const btn = $(e.currentTarget);
    if (btn.text() == "简介") {
      $("nav .item").removeClass("active");
      btn.addClass("active");
      $(".time,.cinemaList").css("display", "none");
      $(".detail").css("display", "block");
    } else {
      $("nav .item").removeClass("active");
      btn.addClass("active");
      $(".time").css("display", "flex");
      $(".cinemaList").css("display", "block");
      $(".detail").css("display", "none");
    }
  });
}
// 影院场次选择
function addTimeChoose() {
  $(".i").on("click", (e) => {
    const btn = $(e.currentTarget);
    if (btn.hasClass("i1")) {
      $(".i").removeClass("active");
      btn.addClass("active");
      cinemaId = btn.parent().attr("data-id");
      // console.log(cinemaId);
    }
  });
}
// 去选座
function addSubmit() {
  $(".submit").on("click", () => {
    // console.log(cinemaId);
    if (cinemaId) {
      location.href = `chooseTicket.html?movieId=${id}&cinemaId=${cinemaId}`;
    } else {
      alert("请选择场次");
    }
  });
}

// 视频存储播放时间
function videoTimeSave() {
  const time = localStorage.getItem("videoTime");
  if (time) {
    video.currentTime = time;
  }
  window.onunload = function () {
    localStorage.setItem("videoTime", video.currentTime);
  };
}
