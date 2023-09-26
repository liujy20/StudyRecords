import axios from 'axios'

const newAxios=axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_API || "",
  timeout:5000
})

export default newAxios