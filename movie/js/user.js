// nav
const order = document.querySelector('#user-order')
const information = document.querySelector('#user-information')
const changePwd = document.querySelector('#user-change-pwd')
const orderBox = document.querySelector('.order')
const informationBox = document.querySelector('.information')
const changePwdBox = document.querySelector('.change')



main()

function main(){
  render()
  addListener();
}

function render(){

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