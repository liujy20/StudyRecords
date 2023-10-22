function getValue<O,K extends keyof O>(obj:O,key:K){
  return obj[key]
}

const user={
  name:'xwg',
  age:12
}
getValue(user,'name')
// getValue(user,'hobby')
getValue(user,'age')
export {}