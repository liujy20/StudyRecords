enum myEnum{
  'up'='上',
  'down'='下',
  'left'='左',
  'right'='右'
}
function logEnum(val:myEnum){
  console.log(val);
  
}
logEnum(myEnum.down)

// 反向映射在数字枚举可用
// 通过值获取键的函数
function getKeyByValue(enumObj: any, value: string) {
  for (const key in enumObj) {
    if (enumObj[key] === value) {
      return key;
    }
  }
  return null; // 如果值没有匹配的键
}

console.log(getKeyByValue(myEnum,'上'))

export {}