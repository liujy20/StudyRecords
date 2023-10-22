interface IUser<T>{
  id:number;
  name:T;
  hobby:T[]
}

const xw:IUser<string>={
  id:1,
  name:'xw',
  hobby:['1','2']
}
export {}