const nowPlayingList = $(".nowPlaying ul");
const upComingList = $(".upComing ul");

main();

function main() {
  render();
}

function render() {
  renderNowPlaying();
  renderUpComing();
}

function renderNowPlaying() {
  nowPlayingList.text('')
  let s = "";
  nowPlaying.forEach((item) => {
    let name = item.title.split(' ')[0]
    s+=`<li>
    <img src="${item.imgSrc}" alt="">
    <div class="name">${name}</div>
  </li>`
  });
  nowPlayingList.html(s)
}
function renderUpComing() {
  upComingList.text('')
  let s = "";
  upComing.forEach((item) => {
    let name = item.title.split(' ')[0]
    s+=`<li>
    <img src="${item.imgSrc}" alt="">
    <div class="name">${name}</div>
  </li>`
  });
  upComingList.html(s)
}
