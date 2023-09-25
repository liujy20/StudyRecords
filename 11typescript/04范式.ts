interface IMsg{
  title:string,
  content:string
}

function fn<T,K extends keyof T>(obj:T,key:K){
  return obj[key]
}