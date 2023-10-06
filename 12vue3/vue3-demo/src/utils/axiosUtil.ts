import router from "@/router";
import axios from "axios";

const newAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "",
  timeout: 5000,
});

newAxios.interceptors.request.use((request) => {
  request.headers.Authentication = localStorage.getItem("token");
  return request;
});

newAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status == 401) {
      router.replace("/login");
      localStorage.clear();
      ElMessage({
        message: "token失效,请重新登录",
        type: "warning",
      });
    }
    return err.response;
  }
);

export default newAxios;
