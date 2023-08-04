<template>
  <div id="main">
    <!-- 搜索 -->
    <div id="search">
      <div class="search-item">
        <span>拼团状态:</span>
        <select name="" id="">
          <option value="true" selected>开启</option>
          <option value="false">关闭</option>
        </select>
      </div>
      <div class="search-item">
        <span>商品搜索:</span>
        <input type="text" :value="searchText" ref="searchInput" />
        <button @click="search" >搜索</button>
      </div>
    </div>
    <!-- list -->
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>拼团图片</th>
          <th>拼团名称</th>
          <th>原价</th>
          <th>拼团价</th>
          <th>拼团人数</th>
          <th>参与人数</th>
          <th>成团数量</th>
          <th>限量</th>
          <th>剩余数量</th>
          <th>结束时间</th>
          <th>拼团状态</th>
          <th>操作</th>
        </tr>

        <template v-for="item in paginGoods">
          <tr v-if="item.residue > 0" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <img width="30" :src="item.img" alt="" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.spellPrice }}</td>
            <td>3</td>
            <td>20</td>
            <td>7</td>
            <td>20</td>
            <td>{{ item.residue }}</td>
            <td>2023-07-24</td>
            <!-- <td ><span :class="{'end':item.status==true,'online':item.status==false}">{{ item.status ? "已结束":"未结束" }}</span></td> -->
            <!-- <td ><span :class="classobj">{{ item.status ? "已结束":"未结束" }}</span></td> -->
            <td>
              <span :class="item.status ? 'end' : 'online'">{{
                item.status ? "已结束" : "未结束"
              }}</span>
            </td>
            <td>
              <button v-on:click="showModal">查看</button>
              <button v-on:click="delGood(item.id)">删除</button>
            </td>
          </tr>
        </template>
      </table>
      <!-- 弹窗 -->
      <div id="modal" v-show="modalShow">
        <div id="modal-body">
          <div class="detail">
            <h3>拼团商品详情</h3>
            <hr />
            <p class="line">
              <span class="key">编号</span>
              <span class="dot">:</span>
              <span class="value">123</span>
            </p>
            <p class="line">
              <span class="key">商品名称</span>
              <span class="dot">:</span>
              <span class="value">香薰</span>
            </p>
          </div>

          <button v-on:click="closeModal">关闭</button>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div id="pagin">
      <div class="null"></div>
      <div class="limit">
        <div class="total">共<span>{{ spellGoods.length }}</span>条</div>
        <select name="" id="" class="sel" :value="pageSize" @change="switchSize">
          <option value="1">1条/页</option>
          <option value="2">2条/页</option>
          <option value="3">3条/页</option>
          <option value="4">4条/页</option>
          <option value="5">5条/页</option>
        </select>
        <div class="changePage">
          <span
            :class="pageNum == item  ? 'active' : ''"
            @click="switchPage(item)"
            v-for="item in totalPage"
            :key="item"
            >{{ item }}</span>
          <!-- <span :class=" curPage ==1 ? 'active':''"  v-on:click="switchPage(1)">1</span> -->
        </div>
        <div class="toPage">前往<input type="text" value="1" @blur="goPage"/>页</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText:"",
      modalShow: false,
      spellGoods: [
        {
          id: 1, //编号
          img: require("../assets/images/5.jpg"), //图片
          name: "香氛无火香薰精油卧室助眠除臭", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: true, //true表示结束
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: true, //上下架
        },
        {
          id: 2, //编号
          img: require("../assets/images/2.png"), //图片
          name: "小米家保温杯云米电热杯", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: true,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: false,
        },
        {
          id: 3, //编号
          img: require("../assets/images/2.png"), //图片
          name: "小米家保温杯云米电热杯", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: false,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: true,
        },
        {
          id: 4, //编号
          img: require("../assets/images/7.jpg"), //图片
          name: "Casio卡西欧女表时尚", //拼团商品名字
          price: 1200, //原价
          spellPrice: 1000, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 10, //限制数量
          residue: 20, //剩余数量
          status: false,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: false,
        },
        {
          id: 5, //编号
          img: require("../assets/images/7.jpg"), //图片
          name: "爱奇艺智能 奇遇LT01 投影仪", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: false,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: false,
        },
        {
          id: 6, //编号
          img: require("../assets/images/8.jpg"), //图片
          name: "TOMFORD汤姆福特唇膏4色TF口红", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: false,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: false,
        },
        {
          id: 7, //编号
          img: require("../assets/images/9.jpg"), //图片
          name: "云麦体脂秤称重女智能精准成人脂肪测量仪", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: false,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: false,
        },
        {
          id: 8, //编号
          img: require("../assets/images/10.jpg"), //图片
          name: "本来设计挂钟原木时钟创意现代简约实木", //拼团商品名字
          price: 59, //原价
          spellPrice: 48, //拼团价格
          spellPeople: 3, //拼团人数
          joinPeople: 6, //参与人数
          spellNumber: 2, //成团数量
          limit: 25, //限制数量
          residue: 20, //剩余数量
          status: false,
          endTime: "2022-12-23 00:00:00",
          payWay: [],
          show: false,
        },
      ],
      // 分页
      pageNum:1,
      pageSize:1
    };
  },
  methods: {
    switchPage(num) {
      this.pageNum = num;
    },
    switchSize(event){
      this.pageSize = event.target.value;
    },
    goPage(event){
     this.pageNum = event.target.value;
    },
    search(){
      // console.log();
      this.searchText = this.$refs.searchInput.value;
    },
    showModal() {
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
    delGood(id) {
      // console.log(id);
      // alert('触发了删除')
      //filter:筛选除了待删除数据以外的所有数据。
      this.spellGoods = this.spellGoods.filter((good) => {
        return good.id != id;
      });
    },
    
  },
  computed:{
    paginGoods(){
      //根据当前页数和每页数量来获取原数组对应位置的数据
      // 第一页：0,1    第二页:2,3  第三页:4,5
      let startIndex =(this.pageNum-1) * this.pageSize;
      let endIndex = this.pageNum * this.pageSize;
      // console.log(this.spellGoods.slice(startIndex,endIndex));
      return this.searchGoods.slice(startIndex,endIndex);
    },
    totalPage(){
      return Math.ceil(this.searchGoods.length / this.pageSize);
    },
    searchGoods(){
      return this.spellGoods.filter(good=>good.name.includes(this.searchText));
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
#search {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 20px;
}
#modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  #modal-body {
    width: 400px;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    .line {
      width: 80%;
      height: 30px;
      display: flex;
      .dot {
        width: 10px;
      }
      .key {
        width: 140px;
        border-bottom: 1px dashed #ccc;
        margin-right: 10px;
      }
      .value {
        flex-grow: 1;
        border-bottom: 1px dashed #ccc;
      }
    }
  }
}
table {
  background-color: #fff;
  tr {
    height: 40px;
  }
  tr:nth-child(odd) {
  }
  tr:nth-child(even) {
    // background-color: #dddcdc;
  }
  td {
    text-align: center;
  }
  td span {
    font-size: 12px;
  }
  .end {
    color: #ccc;
    padding: 5px;
  }
  .online {
    color: white;
    padding: 5px;
    background-color: #73bcf3;
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
        span{
            display: inline-block;
            padding:5px 10px;
            margin:0 5px;
            line-height: 16px;
            border: 1px solid #ccc;
        }
        .active{
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
