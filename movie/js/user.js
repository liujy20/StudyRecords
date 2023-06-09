// 订单数据
const obj = JSON.parse(decodeURI(location.search.slice(1).split('=')[1]))
const movie = nowPlaying.filter(item=>{
  return item.id == obj["movieid"]
})[0]
const cinema = opera.filter(item=>{
  return item.id == obj["cinemaid"]
})[0]


// nav
const order = document.querySelector('#user-order')
const information = document.querySelector('#user-information')
const changePwd = document.querySelector('#user-change-pwd')
const orderBox = document.querySelector('.order')
const informationBox = document.querySelector('.information')
const changePwdBox = document.querySelector('.change')

// 购票数据
const img = document.querySelector('.ibody img')
const movieName = document.querySelector('.des .name')
const address = document.querySelector('.des .address')
const sub = document.querySelector('.des .sub')
const time = document.querySelector('.des .time')
const price = document.querySelector('.ibody .price')


main()

function main(){
  render()
  addListener();
}

function render(){
  renderMovieMSg()
}

/**
 * 订单数据
 */
function renderMovieMSg(){
  img.src = movie.imgSrc
  let index = movie.title.indexOf(" ");
  let title = movie.title;
  if (index != -1) {
    title = movie.title.slice(0, index);
  }
  movieName.innerHTML = title
  address.innerHTML = cinema.name;
  str = obj["seats"].split(',').join(' ') 
  sub.innerHTML =`2号厅 ${str}`
  let num = obj["seats"].split(',').length
  price.innerHTML = `￥38 票数: ${num}张`
}

function addListener(){
  addNavChange()
}

/**
 * 导航点击
 */
function addNavChange(){
  order.onclick = function(){
    order.className = 'active'
    information.className = ''
    changePwd.className = ''
    orderBox.style.display = 'block'
    informationBox.style.display = 'none'
    changePwdBox.style.display = 'none'
  }
  information.onclick = function(){
    order.className = ''
    information.className = 'active'
    changePwd.className = ''
    orderBox.style.display = 'none'
    informationBox.style.display = 'block'
    changePwdBox.style.display = 'none'
  }
  changePwd.onclick = function(){
    order.className = ''
    information.className = ''
    changePwd.className = 'active'
    orderBox.style.display = 'none'
    informationBox.style.display = 'none'
    changePwdBox.style.display = 'block'
  }
}