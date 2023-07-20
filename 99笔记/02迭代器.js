let arr=[1,2,3,4]
let arrIterator=arr[Symbol.iterator]()
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());