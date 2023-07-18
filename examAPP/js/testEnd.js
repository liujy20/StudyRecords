let studentId=localStorage.getItem('user')
let search = location.search.slice(1);
let testId = search.split("=")[1];
let data = {};

main();

async function main() {
  data = await getPromiseAuth("http://127.0.0.1:1234/testeds/getTestMsg", "GET", {
    studentId,
    testId,
  });
  data=data.data
  console.log(data);
  render()
  addClick()
}
function render(){
  // $('.con .userImg')
  $('.con .u-name').text(data.studentId.name)
  $('.con .score').html(`${data.score}<span>分</span>`)
  $('.con .con1 .num').text(data.accuracy)
  $('.con .con2 .num').text(parseTime(data.durations).join(':'))
}
function parseTime(num){
  let s=num%60+'';
  let m=((num-s)/60)%60+''
  let h=(num-num%(60*60))/(60*60)+''
  return [h.padStart(2,'0'),m.padStart(2,'0'),s.padStart(2,'0')]
}
function addClick(){
  $('.start').click(function(){
    location.href=`/html/answer.html?id=${data.testId}`
  })
  $('.return').click(function(){
    location.href='/html/index.html'
  })
}
