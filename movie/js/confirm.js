// 订单信息
const search = location.search.slice(1).split("&");
const obj = JSON.parse(decodeURI(search[0].split("=")[1]));
const cinemaName = decodeURI(search[1].split("=")[1]);
const movieName = decodeURI(search[2].split("=")[1]);

// 计时器
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')

// 订单列表
const title = document.querySelector('.order-body .name')
const region = document.querySelector('.order-body .region')
const seat = document.querySelector('.order-body .seat')

// 支付
const pay = document.querySelector('.pay ul')
const price = document.querySelector('.price .num')
const submit = document.querySelector('.toPay button')


main()

function main(){
  render();
  addListener();
}

function render(){
  renderTimer();
  renderOrder();
  renderPrice();
}

/**
 * 计时器
 */
function renderTimer(){
  let m=13,s=59
  setInterval(()=>{
    if(s==0){
      m--;
      s=59
    }else{
      s--;
    }
    minute.innerHTML = m;
    second.innerHTML = s>9?s:'0'+s;
  },1000)
}


/**
 * 订单
 */
function renderOrder(){
  title.innerHTML = `《${movieName}》`
  region.innerHTML = cinemaName
  seat.innerHTML = '2号厅'
  // console.log(obj["seats"]);
  obj["seats"].split(',').forEach(item=>{
    let span = document.createElement('span')
    span.innerHTML=item;
    seat.appendChild(span)
  })
}

/**
 * 价格计算
 */
function renderPrice(){
  price.innerHTML = obj["seats"].split(',').length*38
}


function addListener(){
  addChooseMethod()
  addSubmit();
}

/**
 * 选择支付方式
 */
function addChooseMethod(){
  pay.addEventListener('click',(e)=>{
    let ele = e.target
    if(ele.tagName == "LI"){
      pay.querySelector('.active').classList.remove('active')
      ele.classList.add('active');
    }
  })
}

function addSubmit(){
  submit.onclick = function(){
    location.href = `success.html?order=${JSON.stringify(obj)}`
  }
}