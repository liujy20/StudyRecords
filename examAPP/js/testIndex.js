let testId=location.search.slice(1).split('=')[1]
let studentId=localStorage.getItem('user')
if(!studentId){
  alert('请先登录')
  location.href='/html/login.html'
}
let testInfo,stuInfo
main()

async function main(){
  await getData()
  render()
  addClick()
}

async function getData(){
  let res = await getPromiseAuth("http://127.0.0.1:1234/testeds/getTestInfo", "POST", {
    testId,
    studentId
  });
  // console.log(res);
  ({stuData:[stuInfo],testData:[testInfo]}=res.data)
  console.log(stuInfo,testInfo);
}

function render(){
  renderTest()
  renderStu()
}

function renderTest(){
  $('main .con').html(`<div class="tit">${testInfo.title}</div>
  <div class="test-msg msg">
    <h3>试卷信息</h3>
    <div class="type">
      考试类型：
      <span>正在考试</span>
    </div>
    <div class="data">
      考试时间：
      <span>${testInfo['start-time']} 9:00 ~ ${testInfo['end-time']} 11:00</span>
    </div>
    <div class="time">
      答卷时间：
      <span>${testInfo.durations}分钟</span>
    </div>
    <div class="method">
      考试方式：
      <span>线上</span>
    </div>
  </div>`)

}
function renderStu(){
  $('main .test-msg').after(`<div class="student-msg msg">
  <h3>考生信息</h3>
  <div class="name">
    姓名：
    <span>张三</span>
  </div>
  <div class="num">
    证件号码：
    <span>3423445234634451231</span>
  </div>
  <div class="department">
    部门：
    <span>信息中心</span>
  </div>
</div>
<button class="start">开始答题</button>
<button class="return">返回上一步</button>`)
}

function addClick(){
  $('.start').click(function(){
    location.href=`/html/test.html?testId=${testInfo._id}&stuId=${stuInfo._id}&pointId=${testInfo.pointId}`
  })
  $('.return').click(function(){
    history.go(-1)

  })
}