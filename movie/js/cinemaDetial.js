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
// 序号
let index = 0
let movieId = 0

// 场次
const sessionTitle = document.querySelector(".movie-list");
const movieName = sessionTitle.querySelector(".name");
const score = sessionTitle.querySelector(".score");
const time = sessionTitle.querySelector("#time .val");
const type = sessionTitle.querySelector("#type .val");
const actor = sessionTitle.querySelector("#actor .val");
const btns = sessionTitle.querySelectorAll('ul li.item')
main();

function main() {
  render();
  addListener();
}

function render() {
  renderTitle();
  renderPath();
  renderMovieList();
  renderMovieTitle(index);
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
  cinema.movies.forEach((item,index) => {
    nowPlaying.forEach((val) => {
      if (item == val.id) {
        let li = document.createElement("li");
        li.innerHTML = `<img src="${val.imgSrc}" alt=""/>`;
        li.setAttribute("data-id", val.id);
        li.setAttribute("index", index);
        if(index==0){
          li.className = 'active'
          movieId = val.id
        }
        movieList.appendChild(li);
      }
    });
  });
}

/**
 * 渲染电影信息
 */
function renderMovieTitle(i) {
  let index = movieList.children[i].getAttribute("data-id");
  nowPlaying.forEach((item) => {
    if (item.id == index) {
      let index = item.title.indexOf(" ");
      let title = item.title
      if(index!=-1){
        title = item.title.slice(0, index);
      }
      
      movieName.innerHTML = title;
      score.innerHTML = item.score;   
      time.innerHTML = item.duration;
      type.innerHTML = item.movieType;
      actor.innerHTML = item.actors;
    }
  });
}

function addListener() {
  addChooseList();
  addBuy();
}

/**
 * 选择电影
 */
function addChooseList(){
  movieList.addEventListener('click',(e)=>{
    let ele = e.target
    if(ele.tagName = 'LI'){
      movieList.querySelector('.active').className=''
      ele.className = 'active'
      index = ele.getAttribute('index')
      movieId = ele.getAttribute('data-id')
      renderMovieTitle(index)
    }
  })
}

/**
 * 选择场次
 */
function addBuy(){
  btns.forEach(item=>{
    item.addEventListener('click',()=>{
      location.href = `buyTickets.html?id=${movieId}&cinema=${cinema.name}&cinema=${cinema.id}`;
    })
  })
}
