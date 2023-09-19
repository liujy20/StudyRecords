import axios from '@/utils/axiosUtil'

export const login=(data)=>{
  return axios({
    url:'/users/login',
    method:'post',
    data
  })
}