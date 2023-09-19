import axios from '../utils/axiosUtil'

/**
 * 获取所有商品
 * @returns 
 */
export const findAllGoods = () => {
  // axios得到结果 Promise
  return axios.get("/goods/findGoods")
}

/**
 * 名称查找
 * @param {*} data 
 * @returns 
 */
export const findGoodsByName=(data)=>{
  return axios({
    url:"/goods/findGoodsByName",
    method:'post',
    data
  })
}
/**
 * 添加商品
 * @param {*} data 
 * @returns 
 */
export const addGoods=(data)=>{
  return axios({
    url:"/goods/addGoods",
    method:'post',
    data
  })
}

/**
 * 修改商品
 * @param {*} data 
 * @returns 
 */
export const updateGoods=(data)=>{
  return axios({
    url:"/goods/updateGoods",
    method:'post',
    data
  })
}

/**
 * id查找商品
 * @param {*} data 
 * @returns 
 */
export const findGoodsById=(data)=>{
  return axios({
    url:"/goods/findGoodsById",
    method:'post',
    data
  })
}