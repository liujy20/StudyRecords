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
// 时间
const time = $(".time");
let userDate
let userTime

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
  renderTime();
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
  const newDate = new Date()
  console.log(newDate.getHours()>11);
  arr.forEach((item) => {
    s += `<li>
    <div class="name">${item.name}</div>
    <div class="address">
      <i></i>
      <div class="text">54.0km • ${item.address}</div>
    </div>
    <div class="price">
      英文 2D • ￥30.00
    </div>
    <div class="timer" data-id=${item.id}>
      <div class="i ${newDate.getHours()>11?'':'i1'}">11:00</div>
      <div class="i ${newDate.getHours()>13?'':'i1'}">13:00</div>
      <div class="i ${newDate.getHours()>15?'':'i1'}">15:00</div>
      <div class="i ${newDate.getHours()>17?'':'i1'}">17:00</div>
      <div class="i ${newDate.getHours()>19?'':'i1'}">19:00</div>
      <div class="i ${newDate.getHours()>21?'':'i1'}">21:00</div>
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

// 渲染时间列表
function renderTime() {
  let date = new Date();
  let s = "";
  for (let i = 0; i < 7; i++) {
    let week = getWeek(date.getDay());
    let month = getMonth(date.getMonth()+1, 2);
    let day = getDay(date.getDate(), 2);

    s += `<li class="" date-time="${date.getFullYear()}-${month}-${day} ${week}">
    <div class="week">${week}</div>
    <div class="day">${month}-${day}</div>
    </li>`;
    date.setDate(date.getDate()+1)
  }
  time.html(s)
}

// 获取星期
function getWeek(week){
  switch(week){
    case 0:
      return '星期天';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    
  }
}
// 获取月份
function getMonth(month,num){
  let s=month
  for(let i=0;i<num-String(month).length;i++){
    s='0'+s;
  }
  return s;
}
// 获取日期
function getDay(day,num){
  let s=day
  for(let i=0;i<num-String(day).length;i++){
    s='0'+s;
  }
  return s;
}

function addListener() {
  addChangeNav();
  addDateChoose();
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
// 时间选择
function addDateChoose(){
  $('.cinema .time li').on('click',(e)=>{
    const date = $(e.currentTarget)
    $(".cinema .time li").removeClass("active");
      date.addClass("active");
      userDate = date.attr('date-time');
      // console.log(userDate);
  })
}

// 影院场次选择
function addTimeChoose() {
  $(".i").on("click", (e) => {
    const btn = $(e.currentTarget);
    if (btn.hasClass("i1")) {
      $(".i").removeClass("active");
      btn.addClass("active");
      cinemaId = btn.parent().attr("data-id");
      userTime = btn.text()
      console.log(userTime);
    }
  });
}
// 去选座
function addSubmit() {
  $(".submit").on("click", () => {
    // console.log(cinemaId);
    if (cinemaId) {
      location.href = `chooseTicket.html?movieId=${id}&cinemaId=${cinemaId}&date=${userDate} ${userTime}`;
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
