import axios from "@/utils/axiosUtil";
import {IGetRole} from '@/interfaces/role'
export const getRole = (data:IGetRole) => {
  return axios.get("/role", {
    params: data,
  });
};
