<template>
  <div id="main">
    <!-- 卡片 -->
    <div id="partin">
      <div class="people">
        <img src="../assets/用户分析 (1).png" alt="" />
        <div class="info">
          <p>参与人数(人)</p>
          107
        </div>
      </div>
      <div class="group">
        <img src="../assets/用户分析.png" alt="" />
        <div class="info">
          <p>成团数量(个)</p>
          14
        </div>
      </div>
    </div>
    <!-- 日期 -->
    <div id="date">
      <div class="date">
        选择时间：
        <div class="cTime">
          <span
            @click="changeTimeArr(index)"
            :class="curTimeArr == index ? 'cspan' : ''"
            v-for="(item, index) in timeArr"
            :key="item"
            >{{ item }}</span
          >
        </div>
        <input type="date"  :disabled="dateIsDisable" v-model="searchDate"/>
      </div>
      <div class="inp">
        拼团状态：
        <select name="" id="" v-model.number="searchStatus">
          <option value="0" selected>全部</option>
          <option value="1">进行中</option>
          <option value="2">已结束</option>
        </select>
      </div>
    </div>
    <!-- 列表 -->
    <div id="group">
      <button class="delMoreBtn" @click="delMore">批量删除</button>
      <table>
        <tr>
          <th>
            <!-- 全选 -->
            <input type="checkbox" name="" id="" v-model="chooseAll" @change="changeChooseAll"/>
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
        <template v-for="item in searchGoods">
          <tr v-if="item.joinPeople > 0" :key="item.id">
            <td>
              <input type="checkbox" name="" id="" v-model="item.isChoose"  />
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
              <button>查看</button>
              <button>删除</button>
            </td>
          </tr>
        </template>
      </table>
      <div class="grey" v-show="show">
        <div class="popUp">
          <div class="close">×</div>
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
    <!-- 分页 -->
    <div id="pagin">
      <div class="null"></div>
      <div class="limit">
        <div class="total">
          共<span>{{ products.length }}</span
          >条
        </div>
        <select name="" id="" class="sel" :value="pageSize">
          <option value="1">1条/页</option>
          <option value="2">2条/页</option>
          <option value="3">3条/页</option>
          <option value="4">4条/页</option>
          <option value="5">5条/页</option>
        </select>
        <div class="changePage">
          <span
            :class="pageNum == item ? 'active' : ''"
            v-for="item in 6"
            :key="item"
            >{{ item }}</span
          >
        </div>
        <div class="toPage">前往<input type="text" value="1" />页</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取指定的日期时间
      searchDate:"",
      //控制日期组件是否可用
      dateIsDisable:true,
      //是否全选
      chooseAll:false,
      //搜索：拼团状态  0表示全部  1表示进行中  2表示已结束
      searchStatus: 0,
      //搜索拼团开始时间 ""表示全部
      searchStartTime: "",
      searchEndTime:"",
      timeArr: ["全部", "今天", "昨天", "最近7天", "最近30天", "本月", "本年","指定时间"],
      curTimeArr: 0,
      show: false,
      products: [
        {
          id: 1, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "jack", //开团团长
          beginTime: "2023-07-27 12:12:23", //
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 2, //参与人数
          status: true, //状态
          endTime: "2024-12-23 00:00:00", //结束时间
          isChoose:false //表示是否被勾选
        },
        {
          id: 2, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tom", //开团团长
          beginTime: "2023-07-26 12:12:23", //原价
          product: {
            // 商品信息
            img: require("../assets/images/5.jpg"), //图片
            name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
            price: 59, //原价
          },
          spellPeople: 3, //拼团人数
          joinPeople: 1, //参与人数
          status: true, //状态
          endTime: "2024-12-23 00:00:00", //结束时间
          isChoose:false //表示是否被勾选
        },
        {
          id: 3, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2023-07-24 12:12:23", //原价
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
          isChoose:false //表示是否被勾选
        },
        {
          id: 4, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2023-07-10 12:12:23", //原价
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
          isChoose:false //表示是否被勾选
        },
        {
          id: 5, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2023-06-28 12:12:23", //原价
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
          isChoose:false //表示是否被勾选
        },
        {
          id: 6, //编号
          img: "https://woniuxy.com/static/woniuopen/img/image-gongzhonghao.png", //图片
          name: "tiffne", //开团团长
          beginTime: "2022-07-12 12:12:23", //原价
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
          isChoose:false //表示是否被勾选
        },
      ],
      // 分页
      pageNum: 1,
      pageSize: 1,
    };
  },
  methods: {
    changeTimeArr(num) {
      //先将日期禁用布尔数据设为true，先禁用
      this.dateIsDisable = true;
      this.curTimeArr = num;
      if (num == 0) {
        this.searchStartTime = "";
      } else if (num == 1) {
        //今天
        let today = new Date(); //当前时间
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        this.searchStartTime = today.getTime();
        this.searchEndTime = "";//没有搜索结束时间
      }else if(num ==2){
        //昨天
        let today = new Date(); //当前时间
        today.setDate(today.getDate() -1);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        this.searchStartTime = today.getTime();
        //配置结束时间；为当天的23:59:59:999 或者第二天的00:00:00:000
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(999);
        this.searchEndTime = today.getTime();
      }else if(num ==3){
        //最近7天
        let today = new Date(); //当前时间
        today.setDate(today.getDate() -7);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        this.searchStartTime = today.getTime();
        //配置结束时间；为当天的23:59:59:999 或者第二天的00:00:00:000
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(999);
        //不需要结束时间
        this.searchEndTime ="";
      }else if(num ==4){
        //最近30天
        let today = new Date(); //当前时间
        today.setDate(today.getDate() -30);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        this.searchStartTime = today.getTime();
        //配置结束时间；为当天的23:59:59:999 或者第二天的00:00:00:000
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(999);
        //不需要结束时间
        this.searchEndTime ="";
      }else if(num ==5){
         //本月
         let today = new Date(); //当前时间
        today.setDate(1);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        this.searchStartTime = today.getTime();
        //配置结束时间；为当天的23:59:59:999 或者第二天的00:00:00:000
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(999);
        //不需要结束时间
        this.searchEndTime ="";
      }else if(num ==6){
         //本年
         let today = new Date(); //当前时间
        today.setDate(1);
        today.setMonth(0);//月份是0~11  0表示1月
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        this.searchStartTime = today.getTime();
        //配置结束时间；为当天的23:59:59:999 或者第二天的00:00:00:000
        today.setHours(23);
        today.setMinutes(59);
        today.setSeconds(59);
        today.setMilliseconds(999);
        //不需要结束时间
        this.searchEndTime ="";
      }else if(num ==7){
        //指定时间
        //启动日期选择组件
        this.dateIsDisable =false;
      }
    },
    delMore(){
      // 1. 拿到需要删除的数据id构成的数组
      let arr =[];
      this.products.forEach(good=>{
        if(good.isChoose){
          arr.push(good.id);
        }
      })
      // 2. 遍历id数组依次删除
      arr.forEach(id=>{
      this.products =   this.products.filter(good=>good.id!=id);
      })
    },
    changeChooseAll(){
       //将数组的数据选中状态进行改变
       this.products.forEach(good=>{
        good.isChoose = this.chooseAll
       })
    },
    
  },
  computed: {
    searchGoods() {
      //初始搜索数据为整个数组
      let resultData = this.products;
      //进行时间的筛选
      if (this.searchStartTime != "") {
        resultData = resultData.filter((good) => {
          //获取每个数据的开始时间戳
          let timeobj = new Date(good.beginTime);
          let time = timeobj.getTime();
          if(this.searchEndTime==""){
            //数据的时间戳要大于搜索的时间戳
            return time >= this.searchStartTime;
          }else{
            //需要判断同时满足搜索开始以及搜索结束时间
            return time >= this.searchStartTime && time <=this.searchEndTime;
          }
        });
      }
      if (this.searchStatus == 0) {
        return resultData;
      } else if (this.searchStatus == 1) {
        return resultData.filter((good) => good.status == false);
      } else {
        return resultData.filter((good) => good.status == true);
      }
    },
  },
  watch:{
    products:{
      handler(newValue,oldValue){
        // 数组：forEach filter map  some  every  reduce
      //更改chooseAll:所有列表数据都被选中，全选才会选中
        this.chooseAll = this.products.every(good=>good.isChoose==true);
      },
      deep:true
    },
    searchDate(newValue){
      console.log("日期",newValue);
      //将时间转为时间戳
      let time = new Date(newValue);
      //输出具体的时间
      // console.log(time.toLocaleString());
      //设置小时为0
      time.setHours(0);
      this.searchStartTime = time.getTime();
      this.searchEndTime = "";
    }
  }
};
</script>

<style lang="scss">
#main {
  background-color: #fff;
  flex-grow: 1;
  overflow-y: auto;
}
#partin {
  background-color: #f5f5f5;
  height: 25vh;
  display: flex;
  align-items: center;
  .people {
    width: 220px;
    height: 70%;
    background-color: #fff;
    margin-left: 25px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 50px;
    }
    .info {
      margin-left: 10px;
      font-size: 28px;
      color: #000;
      font-weight: bold;
      p {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #333;
        font-weight: normal;
      }
    }
  }
  .group {
    width: 220px;
    height: 70%;
    background-color: #fff;
    margin-left: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 50px;
    }
    .info {
      margin-left: 10px;
      font-size: 28px;
      color: #000;
      font-weight: bold;
      p {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #333;
        font-weight: normal;
      }
    }
  }
}
#date {
  height: 130px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  .date {
    height: 30%;
    margin-left: 35px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 20px;
    display: flex;
    align-items: center;
    .cTime {
      font-size: 12px;
      font-weight: normal;
      color: #333;
      border: 1px solid #ddd;
      height: 25px;
      border-radius: 2px;
      display: flex;
      span {
        display: block;
        height: 25px;
        line-height: 25px;
        padding: 0 15px;
        border-right: #ddd 1px solid;
        &:last-child {
          border-right: none;
        }
      }
      .cspan {
        color: #fff;
        background-color: #1890ff;
      }
    }
    input {
      margin-left: 20px;
      width: 200px;
      height: 25px;
    }
  }
  .inp {
    margin-top: 10px;
    margin-left: 35px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
    select {
      width: 200px;
      height: 25px;
    }
  }
}
#group {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  overflow-x: auto;
  .delMoreBtn {
    border: none;
    padding: 5px 10px;
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
#pagin {
  margin-top: 20px;
  height: 70px;
  display: flex;
  font-size: 12px;
  margin-right: 10px;
  .null {
    flex-grow: 1;
  }
  .limit {
    display: flex;
    align-items: center;
    .total {
      margin-right: 20px;
    }
    .sel {
      width: 80px;
      height: 20px;
    }
    .changePage {
      margin-left: 20px;
      span {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 5px;
        line-height: 16px;
        border: 1px solid #ccc;
      }
      .active {
        color: white;
        background-color: #3e8bf0;
      }
    }
    .toPage {
      margin-left: 20px;
      input {
        width: 20px;
        height: 15px;
        margin: 0 5px;
      }
    }
  }
}
</style>
