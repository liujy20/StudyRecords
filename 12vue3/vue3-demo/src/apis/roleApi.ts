import axios from "@/utils/axiosUtil";
import {IGetRole} from '@/interfaces/role'
export const getRole = (data:IGetRole) => {
  return axios.get("/role", {
    params: data,
  });
};
export const addRole = (data:string) => {
  return axios.post("/role", data);
};
export const setRole = (data:string) => {
  return axios.put("/role", data);
};
export const delRole = (roleId:string) => {
  return axios.delete(`/role/${roleId}`);
};
