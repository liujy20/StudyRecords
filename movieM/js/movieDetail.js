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
console.log(id);
// 背景图片
const headerImg = $("header img");
const movieDesc = $(".movie");
const cinemaList = $(".cinemaList");

main();
function main() {
  render();
}
function render() {
  renderDesc();
  renderCinema();
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

function renderCinema() {
  const arr = opera.filter((item) => {
    return item.movies.includes(id);
  });
  console.log(arr);
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
    <div class="timer">
      <div class="i">11:00</div>
      <div class="i">11:00</div>
      <div class="i active">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
      <div class="i i1">11:00</div>
    </div>
  </li>`;
  });
  console.log(s);
  cinemaList.html(s);
}
