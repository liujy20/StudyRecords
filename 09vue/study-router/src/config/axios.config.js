import axios from "axios";

axios.defaults.baseURL='http://localhost:4001'

axios.interceptors.request.use((config)=>{
  config.headers.Authorization=localStorage.getItem('token')
  return config
})

axios.interceptors.response.use((res)=>{
  return res
})