import axios from "@/utils/axiosUtil";

export const login = (data: string) => {
  return axios.post("/login", 'username=bobo&password=1234qwer');
};
export const addUser = (data: string) => {
  return axios({
    url:'/user',
    method:'post',
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data
  });
};

export const getUser = (data:any) => {
  return axios.get("/user", {
    params: data,
  });
};
export const changeUser = (data:string) => {
  return axios.put("/user", data);
};
export const delUser = (userId:string) => {
  return axios.delete(`/user/${userId}`);
};
