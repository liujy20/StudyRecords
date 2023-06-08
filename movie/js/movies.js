const movieList = document.querySelector(".container ul");


main();

function main() {
  render();
  addListener();
}

function render() {
  renderList();
}

function renderList() {
  movieList.innerHTML=''
  nowPlaying.forEach((item) => {
    const li = document.createElement("li");
    let index = item.title.indexOf(" ");
    let title
    let title2 = item.title
    // 小于6直接显示
    if(item.title.length<5){
      title = item.title
    }else{
      title = item.title.slice(0,5)+'...'
    }
    // 有英文名字
    if (index != -1) {
      // title = item.title.slice(0, index);
      if(item.title.length<5){
        title = item.title.slice(0, index);
        title2 = item.title.slice(0, index);
      }else{
        title = item.title.slice(0,5)+'...'
      }
    }
    let type = item.movieType.split(' ').join(' / ').slice(0,this.length-3)
    
    li.innerHTML =`
      <a href="detail.html?id=${item.id}">
        <div class="img">
          <img src="${item.imgSrc}" alt="">
          <div class="desc">
            <div class="title item">${title}<span>${item.score}</span></div>
            <div class="type item"><span>类型:</span>${type}</div>
            <div class="actor item"><span>主演:</span>${item.actors}</div>
            <div class="time item"><span>上映时间:</span>${item.release.slice(0,10)}</div>
          </div>
        </div>
        <div class="name">${title2}</div>
        <div class="score">${item.score}</div>
      </a>`
    movieList.appendChild(li);
  });
}

function addListener() {}
