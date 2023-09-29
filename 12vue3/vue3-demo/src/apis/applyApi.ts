import axios from "@/utils/axiosUtil";
import { ICharge, IShop } from "@/interfaces/apply";
export const getCharge = (data: ICharge) => {
  return axios.get("gen/apply/charge", {
    params: data,
  });
};
export const changeChargeStatus = (data:string) => {
  return axios.put("/gen/apply/charge", data);
};

export const getShop = (data: IShop) => {
  return axios.get("gen/apply", {
    params: data,
  });
};
