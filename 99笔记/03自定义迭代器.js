// let arr = [1, 2, 3];
// for (let i of arr) {
//   console.log(i);
// }
// // for of 调用迭代器
// for (let i of arr[Symbol.iterator]()) {
//   console.log(i);
// }

class Count {
  constructor(num) {
    this.count = 1;
    this.max = num;
  }

  [Symbol.iterator]() {
    let count = this.count;
    let max = this.max;
    return {
      next() {
        if (count < max) {
          return {
            value: count++,
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  }
}
let myCount = new Count(5);
for (let i of myCount) {
  console.log(i);
}
let myIterator=myCount[Symbol.iterator]()
console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());
