import axios from "@/utils/axiosUtil";

export const login = (data: string) => {
  return axios.post("/login", 'username=bobo&password=1234qwer');
};
