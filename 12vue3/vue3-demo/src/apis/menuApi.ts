import { IGetMenu } from '@/interfaces/menu'
import axios from '@/utils/axiosUtil'
export const getMenu=(username:string)=>{
  return axios.get(`/menu/${username}`)
}
export const getAllMenu=(data:IGetMenu)=>{
  return axios.get('/menu',{params:data})
}
export const getMenuByRole=(roleID:string)=>{
  return axios.get(`/role/menu/${roleID}`)
}
export const addMenu=(data:string)=>{
  return axios.post('menu',data)
}
export const setMenu=(data:string)=>{
  return axios.put('menu',data)
}
export const delMenu = (id:string) => {
  return axios.delete(`/menu/${id}`);
};
