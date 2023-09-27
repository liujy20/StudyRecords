import axios from 'axios'

const newAxios=axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_API || "",
  timeout:5000
})

newAxios.interceptors.request.use((request)=>{
  request.headers.Authentication=localStorage.getItem('token')
  return request
})

export default newAxios