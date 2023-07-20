let arr1=['aa','bb','cc']
let arr2=['11',['22','33']]
// 不大打平数组
arr2[Symbol.isConcatSpreadable]=false
console.log(arr1.concat(arr2,'123'));