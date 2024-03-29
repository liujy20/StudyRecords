import axios from "axios";

axios.defaults.baseURL='http://localhost:4001'

// 请求拦截器
axios.interceptors.request.use((config)=>{
  config.headers.Authorization=localStorage.getItem('token')
  return config
})

// 响应拦截器
axios.interceptors.response.use((res)=>{
  return res
})