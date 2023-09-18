import axios from "../utils/axiosUtil";

/**
 * 获取所有角色
 * @returns
 */
export const findRoles = () => {
  // axios得到结果 Promise
  return axios.get("/roles/findRoles");
};

/**
 * 修改角色
 * @param {*} data 
 * @returns 
 */
export const addAuth = (data) => {
  // axios得到结果 Promise
  return axios({
    url: "/roles/addAuth",
    method: "post",
    data,
  });
};

/**
 * 添加角色
 * @param {*} data 
 * @returns 
 */
export const addRoles = (data) => {
  // axios得到结果 Promise
  return axios({
    url: "/roles/addRoles",
    method: "post",
    data,
  });
};