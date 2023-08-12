import axios from "axios";
class UserHttp {
  /**
   * 获取分页数据
   * @param {*} data {page:1,limit:5}
   * @returns
   */
  getUser(data) {
    return axios({
      url: "/admin/get",
      method: "post",
      data,
    });
  }

  /**
   * 获取总页数
   * @returns
   */
  getAllPage() {
    return axios({
      url: "/admin/get",
      method: "post",
      data: {},
    });
  }

  /**
   * 删除用户
   * @param {*} data {_id:id}
   * @returns
   */
  delUser(data) {
    return axios({
      url: "/admin/delete",
      method: "post",
      data,
    });
  }

  /**
   * token获取用户信息
   * @returns
   */
  getUserInfo() {
    return axios.get("/admin/getUserInfo", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  /**
   * 登录
   * @param {*} data {account:"",pwd:""}
   * @returns
   */
  login(data) {
    return axios({
      url: "/admin/login",
      method: "post",
      data,
    });
  }

  /**
   * 获取用户权限
   * @param {*} data {_id:""}
   * @returns
   */
  getRightById(data) {
    return axios({
      url: "/systemUser/getById",
      method: "post",
      data,
    });
  }

  /**
   * 修改用户信息
   * @param {*} data user
   * @returns
   */
  modifyUser(data) {
    return axios({
      url: "/admin/set",
      method: "post",
      data,
    });
  }

  /**
   * 创建用户
   * @param {*} adta user
   * @returns
   */
  addUser(data) {
    return axios({
      url: "/admin/add",
      method: "post",
      data,
    });
  }

  /**
   * 获取管理员类型列表
   * @returns
   */
  getSystemUser() {
    return axios({
      url: "/systemUser/get",
      method: "post",
      data: {},
    });
  }

  /**
   * 获取规则
   * @returns
   */
  getSystemRule() {
    return axios({
      url: "/system/get",
      method: "post",
      data: {},
    });
  }

  /**
   * 添加角色
   * @param {*} data {"roleName": "","status": "","rules": ""}
   * @returns 
   */
  addSystemUser(data) {
    return axios({
      url: "/systemUser/add",
      method: "post",
      data,
    });
  }
}

export default new UserHttp();
