// function *fn(num){
//   console.log(num);
//    console.log(yield);
//    console.log(yield);
// }

// let generator=fn(1)
// console.log(generator.next(100));//启动生成器
// console.log(generator.next(2));//输入的值作为下一个的值
// console.log(generator.next(3));

// ====================================================
// function* generatorFn() { 
//   return yield 'foo'; 
//  } 
//  let generatorObject = generatorFn(); 
//  console.log(generatorObject.next());//计算下一次值为'foo'
//  console.log(generatorObject.next('bar'));//输入的值作为下一个的值

function *fn(){
  yield *[1,2];
}
let generator=fn()
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
