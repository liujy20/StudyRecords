import axios from 'axios'
const newAxios = axios.create({
  baseURL: "http://127.0.0.1:8002",
  timeout: 5000
})
// 设置请求拦截器
// newAxios.interceptors.request.use()
// 响应拦截器
export default newAxios