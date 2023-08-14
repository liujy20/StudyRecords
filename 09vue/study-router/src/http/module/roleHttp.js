import axios from "axios";
class RoleHttp{
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

    /**
     * 修改角色
     * @param {*} data 
     * @returns 
     */
    modifySystemUser(data){
      return axios({
        url: "/systemUser/set",
        method: "post",
        data,
      });
    }
}

export default new RoleHttp()