<template>
    <div id="group">
      <button class="delMoreBtn">批量删除</button>
      <table>
        <tr>
          <th>
            <input type="checkbox" name="" id="">
          </th>
          <th>ID</th>
          <th>头像</th>
          <th>开团团长</th>
          <th>开团时间</th>
          <th>拼团商品</th>
          <th>几人团</th>
          <th>几人参加</th>
          <th>结束时间</th>
          <th>拼团状态</th>
          <th>操作</th>
        </tr>
        <template v-if="products.length == 0">
          <tr>
            <td colspan="10">暂无数据</td>
          </tr>
        </template>
        <template v-for="item in products">
          <tr v-if="item.joinPeople > 0" :key="item.id">
            <td>
              <input type="checkbox" name="" id="">
            </td>
            <td>{{ item.id }}</td>
            <td><img width="30" :src="item.product.img" alt="" /></td>
            <td>{{ item.name }}</td>
            <td>{{ item.beginTime }}</td>
            <td>{{ item.product.name }}</td>
            <td>{{ item.spellPeople }}</td>
            <td>{{ item.joinPeople }}</td>
            <td>{{ item.endTime }}</td>
            <td>
              <span :class="item.status ? 'over' : 'online'">
                {{ item.status ? "已结束" : "进行中" }}
              </span>
            </td>
            <td>
              <button @click="showUp">查看</button>
              <button @click="delGroup(item.id)">删除</button>
            </td>
          </tr>
        </template>
      </table>
      <div class="grey" v-show="show">
        <div class="popUp">
          <div class="close" @click="showUp">×</div>
          <div class="pop-con">
            <p class="ti">拼团商品详情</p>
            <div class="goodsInfo">
              <div class="num">编号</div>
              :
              <div class="val">123</div>
            </div>
            <div class="goodsInfo">
              <div class="num">商品名称</div>
              :
              <div class="val">香薰</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            id: 1, //编号
            img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
            name: "jack", //开团团长
            beginTime: "2023-02-12 12:12:23", //原价
            product: {
              // 商品信息
              img: require("../assets/images/5.jpg"), //图片
              name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
              price: 59, //原价
            },
            spellPeople: 3, //拼团人数
            joinPeople: 2, //参与人数
            status: true, //状态
            endTime: "2022-12-23 00:00:00", //结束时间
          },
          {
            id: 2, //编号
            img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
            name: "tom", //开团团长
            beginTime: "2023-02-12 12:12:23", //原价
            product: {
              // 商品信息
              img: require("../assets/images/5.jpg"), //图片
              name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
              price: 59, //原价
            },
            spellPeople: 3, //拼团人数
            joinPeople: 1, //参与人数
            status: true, //状态
            endTime: "2022-12-23 00:00:00", //结束时间
          },
          {
            id: 3, //编号
            img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
            name: "tiffne", //开团团长
            beginTime: "2023-02-12 12:12:23", //原价
            product: {
              // 商品信息
              img: require("../assets/images/5.jpg"), //图片
              name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
              price: 59, //原价
            },
            spellPeople: 3, //拼团人数
            joinPeople: 9, //参与人数
            status: true, //状态
            endTime: "2022-12-23 00:00:00", //结束时间
          },
          {
            id: 4, //编号
            img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
            name: "tiffne", //开团团长
            beginTime: "2023-02-12 12:12:23", //原价
            product: {
              // 商品信息
              img: require("../assets/images/5.jpg"), //图片
              name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
              price: 59, //原价
            },
            spellPeople: 3, //拼团人数
            joinPeople: 7, //参与人数
            status: false, //状态
            endTime: "2022-12-23 00:00:00", //结束时间
          },
          {
            id: 5, //编号
            img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
            name: "tiffne", //开团团长
            beginTime: "2023-02-12 12:12:23", //原价
            product: {
              // 商品信息
              img: require("../assets/images/5.jpg"), //图片
              name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
              price: 59, //原价
            },
            spellPeople: 3, //拼团人数
            joinPeople: 13, //参与人数
            status: false, //状态
            endTime: "2022-12-23 00:00:00", //结束时间
          },
          {
            id: 6, //编号
            img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
            name: "tiffne", //开团团长
            beginTime: "2023-02-12 12:12:23", //原价
            product: {
              // 商品信息
              img: require("../assets/images/5.jpg"), //图片
              name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
              price: 59, //原价
            },
            spellPeople: 3, //拼团人数
            joinPeople: 3, //参与人数
            status: true, //状态
            endTime: "2022-12-23 00:00:00", //结束时间
          },
        ],
        show: false,
      };
    },
    methods: {
      showUp() {
        this.show = this.show ? false : true;
      },
      delGroup(id) {
        this.products = this.products.filter((v) => v.id != id);
      },
    },
  };
  </script>
  
  <style lang='scss'>
  #group {
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    overflow-x: auto;   
    .delMoreBtn{
      border:none;
      padding:5px 10px;
      line-height: 30px;
      background-color: red;
      color: white;
      border-radius: 10px;
      cursor: pointer;
    }
    table {
      width: 120%;
      font-size: 12px;
      border-collapse: collapse;
      border-spacing: 0;
      tr {
        th {
          height: 50px;
          border-bottom: 1px solid #ddd;
          // padding: 0 50px;
        }
        td {
          height: 25px;
          line-height: 25px;
          border-bottom: 1px solid #ddd;
          text-align: center;
          .online {
            background-color: rgb(131, 196, 237);
            display: block;
            height: 25px;
            border-radius: 2px;
            color: #fff;
          }
          .over {
            background-color: #919191;
            display: block;
            height: 25px;
            border-radius: 2px;
            color: #fff;
          }
          button {
            border: none;
            background-color: transparent;
            color: #6290ff;
            font-size: 12px;
          }
        }
      }
    }
    .grey {
      // background-color: black;
      height: 100vh;
      width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .popUp {
        width: 400px;
        height: 200px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        .close {
          font-size: 20px;
          color: red;
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
        .pop-con {
          margin: 0 auto;
          width: 370px;
          margin-top: 30px;
          position: relative;
          .ti {
            padding-bottom: 15px;
            border-bottom: 2px #919191 solid;
            text-align: left;
            font-weight: bold;
          }
          .goodsInfo {
            display: flex;
            text-align: left;
            margin-bottom: 12px;
            .num {
              width: 150px;
              border-bottom: #919191 2px dotted;
              margin-right: 5px;
              padding-bottom: 5px;
            }
            .val {
              width: 150px;
              border-bottom: #919191 2px dotted;
              margin-left: 5px;
              padding-bottom: 5px;
            }
          }
        }
      }
    }
  }
  </style>