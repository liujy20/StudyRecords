// TODU添加渲染


$('nav .item').click(function(){
  location.href='/html/testList.html'
})

$("header .menu").click(function(){
  let ele=$('.sub-m')
  ele.css('transform','scale(1)')
  // $('.mask').css('display','block')
  $('.mask').css('opacity','1')
})
$(".sub-m .close").click(function(){
  let ele=$('.sub-m')
  ele.css('transform','scale(0)')
  $('.mask').css('opacity','0')
  // $('.mask').css('display','none')
})