import axios from '@/utils/axiosUtil'
// 名称验证
export const findName=(shopname:string)=>{
  return axios.get(`/gen/apply/shop/shopname/${shopname}`)
}
// 手机验证
export const findTel=(tel:string)=>{
  return axios.get(`/gen/apply/shop/tel/${tel}`)
}
// 注册
export const register=(data:string)=>{
  return axios.post('/gen/apply/shop',data)
}