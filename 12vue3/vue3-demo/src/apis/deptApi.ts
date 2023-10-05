import axios from "@/utils/axiosUtil";
export const getDept = () => {
  return axios.get("/dept");
};
