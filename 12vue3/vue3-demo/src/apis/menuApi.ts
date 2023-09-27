import axios from '@/utils/axiosUtil'
export const getMenu=(username:string)=>{
  return axios.get(`/menu/${username}`)
}