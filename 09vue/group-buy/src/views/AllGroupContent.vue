<template>
  <div class="content">
    <div class="num">
      <div class="card">
        <img :src="img" alt="" />
        <div class="info">
          <div class="tit">参与人数(人)</div>
          <div class="count">{{ peopleCount }}</div>
        </div>
      </div>
      <div class="card">
        <img :src="img" alt="" />
        <div class="info">
          <div class="tit">成团人数(个)</div>
          <div class="count">{{ groupCount }}</div>
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="tit">
        <div class="time">
          <div class="choiceTime item">
            <div class="name">时间选择：</div>
            <div class="choice">
              <button
                class="start"
                :class="currentBtn == 1 ? 'active' : ''"
                @click="changeCurrent(1)"
              >
                今天
              </button>
              <button
                :class="currentBtn == 2 ? 'active' : ''"
                @click="changeCurrent(2)"
              >
                今天
              </button>
              <button
                :class="currentBtn == 3 ? 'active' : ''"
                @click="changeCurrent(3)"
              >
                今天
              </button>
              <button
                :class="currentBtn == 4 ? 'active' : ''"
                @click="changeCurrent(4)"
              >
                今天
              </button>
              <button
                :class="currentBtn == 5 ? 'active' : ''"
                @click="changeCurrent(5)"
              >
                今天
              </button>
              <button
                :class="currentBtn == 6 ? 'active' : ''"
                @click="changeCurrent(6)"
              >
                今天
              </button>
              <button
                class="end"
                :class="currentBtn == 7 ? 'active' : ''"
                @click="changeCurrent(7)"
              >
                今天
              </button>
            </div>
            <input type="date" />
          </div>
          <div class="status item">
            <div class="name">拼团状态：</div>
            <select name="" id="" value='0' @change="switchStatus">
              <option value="0">全部</option>
              <option value="1">进行中</option>
              <option value="2">已结束</option>
            </select>
          </div>
        </div>
      </div>
      <div class="table">
        <table v-if="products.length > 0">
          <tr>
            <th class="box"></th>
            <th>ID</th>
            <th>拼团图片</th>
            <th class="name">开团团长</th>
            <th>开团时间</th>
            <th>拼团商品</th>
            <th>拼团人数</th>
            <th>参与人数</th>
            <th>结束时间</th>
            <th class="f1">拼团状态</th>
            <th class="f2">操作</th>
          </tr>
          <tr v-for="item in currentList" :key="item.id">
            <td class="box"><input type="checkbox" /></td>
            <td>{{ item.id }}</td>
            <td>
              <img width="30" :src="item.img" alt="" />
            </td>
            <td class="name">{{ item.name }}</td>
            <td>{{ item.beginTime }}</td>
            <td class="info">
              <img width="30" :src="item.product.img" alt="" />
              <div>{{ item.product.name }}</div>
              <div>{{ item.product.price }}</div>
            </td>
            <td>{{ item.spellPeople }}</td>
            <td>{{ item.joinPeople }}</td>
            <td>{{ item.endTime }}</td>
            <td></td>
            <td></td>
            <td class="f1">
              <div :class="item.status ? 'end' : 'online'">
                {{ item.status ? "已结束" : "未结束" }}
              </div>
            </td>
            <td class="f2">
              <button @click="isShow = !isShow">查看</button>
              <button @click="delModel(item.id)">删除</button>
            </td>
          </tr>
        </table>
        <div v-else>暂无数据</div>
        <div class="goodInfo" v-show="isShow">
          <div class="box">
            <div class="tit">拼团商品详情</div>
            <div class="info">
              <div class="id">
                <span class="s1">编号</span>:
                <span class="s2">123</span>
              </div>
              <div class="name">
                <span class="s1">商品名称</span>:
                <span class="s2">香薰</span>
              </div>
            </div>
            <button @click="isShow = !isShow">关闭</button>
          </div>
        </div>
      </div>
      <div id="pagin">
        <div class="null"></div>
        <div class="limit">
          <div class="total">
            共<span>{{ products.length }}</span
            >条
          </div>
          <select name="" id="" class="sel" value="1" @change="switchSize">
            <option value="1">1条/页</option>
            <option value="2">2条/页</option>
            <option value="5">5条/页</option>
            <option value="10">10条/页</option>
          </select>
          <div class="changePage">
            <span
              v-for="(item, index) in pageCount"
              :key="index"
              @click="changePage(index)"
              :class="currentPage == index ? 'active' : ''"
              >{{ item }}</span
            >
          </div>
          <div class="toPage">
            前往<input type="text" value="1" v-on:keyup.enter="jumpPage" />页
          </div>
        </div>
      </div>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script>
import { products } from "../data/team";
import img from "../assets/用户分析.png";
export default {
  name: "AllContent",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      img,
      products,
      currentPage: 0,
      isShow: false,
      currentBtn: 1,
      pageSize: 1,
      statusList:products
    };
  },
  computed: {
    groupCount() {
      let count = 0;
      this.products.forEach((item) => {
        count += Math.ceil(item.joinPeople / item.spellPeople);
      });
      return count;
    },
    peopleCount() {
      return this.products.reduce((prev, next) => {
        return prev + next.joinPeople;
      }, 0);
    },
    pageCount() {
      return Math.ceil(this.statusList.length / this.pageSize);
    },
    currentList(){
      let start=this.currentPage*this.pageSize
      return this.statusList.slice(start,start+this.pageSize)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delModel(data) {
      this.products.forEach((item, index) => {
        if (item.id == data) {
          this.products.splice(index, 1);
        }
      });
    },
    changeCurrent(num) {
      this.currentBtn = num;
    },
    changePage(num) {
      this.currentPage = num;
    },
    switchSize(event) {
      this.pageSize = +event.target.value;
    },
    jumpPage(event){
      this.currentPage=event.target.value-1;
    },
    switchStatus(event){
      let f=event.target.value
      console.log(f);
      if(f==0){
        this.statusList=this.products
      }else if(f==1){
        this.statusList=this.products.filter(item=>{
          return !item.status
        })
      }else{
        this.statusList=this.products.filter(item=>{
          return item.status
        })
      }
    }
  },
};
</script>

<style scoped lang="scss">
.content {
  background-color: #f5f5f5;
  overflow: auto;
  height: calc(100% - 50px);
  .num {
    display: flex;
    align-items: center;
    margin: 20px;
    .card {
      display: flex;

      width: 240px;
      height: 110px;
      padding: 25px;
      margin: 20px 20px 0 0;
      background-color: #fff;
      border-radius: 9px;
      box-sizing: border-box;
      img {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      .info {
        text-align: left;
        .tit {
          font-size: 14px;
          color: #606266;
        }
        .count {
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }
      }
    }
  }
  .bg {
    margin: 20px;
    background-color: #fff;
    text-align: left;
    position: relative;
    overflow: hidden;
    .tit {
      padding-bottom: 20px;
      border-bottom: 1px solid #e6ebf5;
      .time {
        padding: 20px 20px 0;
        .item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          .name {
            padding: 0 12px;
            font-size: 14px;
            color: #606266;
            font-weight: bold;
            line-height: 32px;
          }
        }
        .choiceTime {
          .choice {
            display: flex;
            margin-right: 20px;
            button {
              padding: 9px 15px;
              font-size: 12px;
              color: #606266;
              border-radius: 0;
              border: 1px solid #dcdfe6;
              line-height: 1;
              background-color: #fff;
            }
            .start {
              border-radius: 3px 0 0 3px;
            }
            .end {
              border-radius: 0 3px 3px 0;
            }
            .active {
              background-color: #1890ff;
              color: #fff;
            }
          }
          input {
            width: 250px;
            height: 32px;
          }
        }
        .status {
          select {
            width: 300px;
            height: 30px;
          }
        }
      }
    }
    .table {
      height: 100%;
      padding: 20px;
      overflow: auto;
      table {
        border-collapse: collapse;
        tr {
          font-size: 12px;
          text-align: center;
          height: 50px;
          &:hover {
            background-color: #f5f7fa;
            .f1,
            .f2 {
              background-color: #f5f7fa;
            }
          }
          th {
            padding: 6px 10px;
            color: #333;
            box-sizing: border-box;
            flex-shrink: 0;
            // background-color: #fff;
          }
          td {
            padding: 6px 10px;
            color: #606266;
            box-sizing: border-box;
            min-width: 100px;
            border-top: 1px solid #e6ebf5;
            // background-color: #fff;
          }
          .box {
            min-width: 50px;
            input:checked {
              background-color: #1890ff;
            }
          }
        }
        .name {
          text-align: left;
        }
        .info {
          min-width: 300px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
        .f1 {
          position: absolute;
          right: 100px;
          height: 50px;
          width: 100px;
          line-height: 38px;
          // top: 30px;
          background-color: #fff;
          box-shadow: -4px 0 15px -4px rgba(0, 0, 0, 0.12);
          .end {
            margin: auto;
            width: 60%;
            background-color: lightblue;
            color: #fff;
          }
        }
        .f2 {
          position: absolute;
          right: 0;
          height: 50px;
          width: 120px;
          line-height: 38px;
          // top: 30px;
          background-color: #fff;
          button {
            margin: 0 5px;
          }
        }
      }
    }
    .goodInfo {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000a;
      .box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 400px;
        height: 250px;
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        box-sizing: border-box;
        text-align: left;
        .tit {
          font-size: 26px;
          line-height: 50px;
          border-bottom: 3px solid #ccc;
          font-weight: bold;
        }
        .info {
          padding: 10px 0;
          .id,
          .name {
            display: flex;
            margin-top: 10px;
            span {
              margin-right: 10px;
              height: 30px;
              width: 120px;
              border-bottom: 1px dashed #ccc;
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
  }
}
</style>