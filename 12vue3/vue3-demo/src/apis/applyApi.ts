import axios from '@/utils/axiosUtil'
import {ICharge} from '@/interfaces/apply'
export const getCharge=(data:ICharge)=>{
  return axios.get(
    'gen/apply/charge',
    {
      params:data
    }
  )
}
export const getShop=(data)=>{
  return axios.get(
    'gen/apply',
    {
      params:data
    }
  )
}