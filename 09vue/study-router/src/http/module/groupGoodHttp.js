import axios from "axios";
class GroupGoodHttp{
  /**
   * 获取拼团商品
   * @returns 
   */
  getGroupGoods(){
    return axios({
      url: "/home/groupGoods/get",
      method: "post",
    })
  };

  /**
   * 删除拼团商品
   * @param {*} data {id:string}
   * @returns 
   */
  delGood(data){
    return axios({
      url: "/groupGoods/delete",
      method: "post",
      data
    })
  }
}

export default new GroupGoodHttp()