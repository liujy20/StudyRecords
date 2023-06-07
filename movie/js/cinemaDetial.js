// 获取id
const id = location.search.slice(1).split("=")[1];
const cinema = opera.filter((item) => {
  return item.id == id;
})[0];
// console.log(cinema);
const title = document.querySelector(".center");
const img = document.querySelector(".img-bg img");
// 路径
const path = document.querySelector(".path");
// 电影列表
const movieList = document.querySelector(".movie-img-list ul");
// 场次
const sessionTitle = document.querySelector(".movie-list");
const movieName = sessionTitle.querySelector(".name");
const time = sessionTitle.querySelector("#time .val");
const type = sessionTitle.querySelector("#type .val");
const actor = sessionTitle.querySelector("#actor .val");

main();

function main() {
  render();
  addListener();
}

function render() {
  renderTitle();
  renderPath();
  renderMovieList();
  renderMovieTitle()
}

/**
 * 渲染主页
 */
function renderTitle() {
  img.src = cinema.img_src;
  title.children[0].innerHTML = cinema.name;
  title.children[1].innerHTML = cinema.address;
  title.children[2].innerHTML = cinema.phone;
}

/**
 * 渲染路径
 */
function renderPath() {
  path.innerHTML = `蜗牛电影 > 影院 > ${cinema.name}`;
}

/**
 * 渲染电影列表
 */
function renderMovieList() {
  movieList.innerHTML = "";
  cinema.movies.forEach((item) => {
    nowPlaying.forEach((val) => {
      if (item == val.id) {
        let li = document.createElement("li");
        li.innerHTML = `<img src="${val.imgSrc}" alt=""/>`;
        li.setAttribute("data-id", val.id);
        movieList.appendChild(li);
      }
    });
  });
}

/**
 * 渲染电影信息
 */
function renderMovieTitle() {
  let index = movieList.children[0].getAttribute("data-id");
  nowPlaying.forEach((item) => {
    if (item.id == index) {
      let index = item.title.indexOf(" ");
      const title = item.title.slice(0, index);
      movieName.innerHTML = title;
      time.innerHTML = item.duration;
      type.innerHTML = item.movieType;
      actor.innerHTML = item.actors;
    }
  });
}

function addListener() {}
