// function *Mylog(){
//   console.log('xwg');
// }

// Mylog().next()

function *fn(num){
  console.log(num);
   console.log(yield);
   console.log(yield);
}

let generator=fn(1)
console.log(generator.next(100));//启动生成器
console.log(generator.next(2));//输入的值作为下一个的值
console.log(generator.next(3));