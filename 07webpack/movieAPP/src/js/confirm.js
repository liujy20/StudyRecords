import "@scss/common.scss";
import "@scss/confirm.scss";
import "@js/resize";
import { nowPlaying, upComing, opera } from "@js/movieData.js";
// console.log(nowPlaying,upComing);

// 电影ID
const movieId = location.search.slice(1).split("&")[0].split("=")[1];
// 影院ID
const cinemaId = location.search.slice(1).split("&")[1].split("=")[1];
// 座位
const seat = location.search.slice(1).split('&')[2].split('=')[1].split(',')
// 时间
const userDate = decodeURI(location.search.slice(1).split("&")[3].split("=")[1]).split(' ');
// 电影数据
const movie = nowPlaying.find((item) => {
  return item.id == movieId;
});
// 影院数据
const cinema = opera.find((item) => {
  return item.id == cinemaId;
});
// console.log(movie,cinema,seat,userDate);

main()

function main(){
  render()
  addListener()
}

function render(){
  renderTit()
  renderDate()
  renderSeat()
  renderTime()
}

// 渲染标题
function renderTit(){
  $('.tit').html(`
  <img src="${movie.imgSrc}" alt="">
    <div class="desc">
      <div class="no">订单号： 72132342241</div>
      <div class="name">${movie.title.split(' ')[0]}</div>
      <div class="wrap">
        <div class="region">${cinema.name.split('（')[0]}</div>
        <span> • </span>
        <div class="lang">${movie.language}</div>
      </div>
    </div>`)
}

// 渲染日期
function renderDate(){
  $('.con1 .data .sub').text(`${userDate[0]} ${userDate[1]}`)
}

// 渲染座位相关
function renderSeat(){
  $('.con2 .num .sub').text(seat.length)
  $('.con1 .price .sub').text(`￥${(seat.length*40).toFixed(2)}`)
  $('.total .sub').text(`￥${(seat.length*40+3).toFixed(2)}`)
  console.log(seat);
  let s='';
  seat.forEach(item=>{
    s+=`<li>${item}</li>`
  })
  $('.seat ul').html(s)
}

// 渲染时间
function renderTime(){
  $('.con2 .time .sub').text(userDate[2])
}

function addListener(){
   addSubmit()
}

// 支付
function addSubmit(){
  $(".submit").on('click',()=>{
    const ticketInfo={}
    ticketInfo.id=new Date().getTime()
    ticketInfo.movieId=movieId
    ticketInfo.cinemaId=cinemaId
    ticketInfo.seat=seat
    ticketInfo.userDate=userDate
    localStorage.setItem('ticketInfo',JSON.stringify(ticketInfo))
    location.href=`success.html`
  })
}