import axios from '../utils/axiosUtil'

/**
 * 获取级联分类
 * @returns 
 */
export const findAllCategroy=()=>{
  return axios({
    url:'/categroy/findAllCategroy',
    method:'get',
    data:{parentId:0}
  })
}

/**
 * ID获取分类
 * @param {*} data 
 * @returns 
 */
export const findCategroy=(params)=>{
  return axios({
    url:'/categroy/findCategroy',
    method:'get',
    params
  })
}

export const addCategroy=(data)=>{
  return axios({
    url:'/categroy/addCategroy',
    method:'post',
    data
  })
}