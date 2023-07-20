let myMap=new Map([
  ['a','aVal'],
  ['b','bVal'],
  ['c','cVal'],]
)
for(let i of myMap){
  console.log(i);
}
console.log('//=========================');
for(let i of myMap.entries()){
  console.log(i);
}
console.log('//=========================');
for(let i of myMap[Symbol.iterator]()){
  console.log(i);
}