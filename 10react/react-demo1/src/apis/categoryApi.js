import axios from '../utils/axiosUtil'

export const findAllCategroy=()=>{
  return axios({
    url:'/categroy/findAllCategroy',
    method:'get',
    data:{parentId:0}
  })
}