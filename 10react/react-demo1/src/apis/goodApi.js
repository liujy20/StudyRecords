import axios from '../utils/axiosUtil'

/**
 * 获取所有商品
 * @returns 
 */
export const findAllGoods = () => {
  // axios得到结果 Promise
  return axios.get("/goods/findGoods")
}

export const findGoodsByName=(data)=>{
  return axios({
    url:"/goods/findGoodsByName",
    method:'post',
    data
  })
}

export const addGoods=(data)=>{
  return axios({
    url:"/goods/addGoods",
    method:'post',
    data
  })
}