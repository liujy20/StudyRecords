import axios from '@/utils/axiosUtil'
export const findAllGood=()=>{
  return axios.get('/goods/findGoods')
}