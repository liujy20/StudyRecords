let ticketInfo = {};
if (localStorage.getItem("ticketInfo")) {
  ticketInfo = JSON.parse(localStorage.getItem("ticketInfo"));
} else {
  location.href = "index.html";
}
console.log(ticketInfo);

// 电影数据
const movie = nowPlaying.find((item) => {
  return item.id == ticketInfo.movieId;
});
// 影院数据
const cinema = opera.find((item) => {
  return item.id == ticketInfo.cinemaId;
});
// 时间
const userDate = ticketInfo.userDate;
// 座位列表
const seat = ticketInfo.seat;
// 兑换码
const codeNum=location.search.slice(1).split('=')[1]
// console.log(codeNum);

main()

function main(){
  render()
  addListener()
}

function render(){
  renderTitle()
  renderCode()
  renderQRCode()
}

// 渲染标题
function renderTitle(){
  let s = "";
  seat.forEach((item) => {
    s += `<li>${item}</li>`;
  });
  $(".title").html(`
  <img src="${movie.imgSrc}" alt="">
    <div class="desc">
      <div class="name">${movie.title.split(" ")[0]}</div>
      <div class="region">${cinema.name.split("（")[0]}</div>
      <div class="date">${userDate[0]} ${userDate[2]}</div>
      <ul>${s}</ul>
    </div>`);
}
// 兑换码
function renderCode(){
  $('.con .code2').text(codeNum)
}

// 二维码
function renderQRCode(){
  $('.con .code1').qrcode(`movieDetail.html?id=${movie.id}`)
  $('.con .code1').on('click',()=>{
    location.href = `movieDetail.html?id=${movie.id}`
  })
  $('.con .code1 canvas').css('wdith', '3.42rem')
  $('.con .code1 canvas').css('height', '3.42rem')
}
function addListener(){

}