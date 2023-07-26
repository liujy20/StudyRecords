<template>
  <div class="content">
    <div class="bg">
      <div class="tit">
        <div class="search">
          <div class="item">
            <div class="name">拼团状态：</div>
            <select ref="selectStatus" value="0" @change="searchGoods">
              <option value="0">全部</option>
              <option value="1">进行中</option>
              <option value="2">已结束</option>
            </select>
          </div>
          <div class="item sItem">
            <div class="name">商品搜索：</div>
            <input type="text" ref="searchInput" />
            <button @click="searchGoods">搜索</button>
          </div>
        </div>
        <button>导入</button>
      </div>
      <div class="table">
        <!-- spellGoods.every((item) => item.residue == 0) || -->
        <table v-if="spellGoods.length > 0">
          <tr>
            <th>ID</th>
            <th>拼团图片</th>
            <th class="name">拼团名称</th>
            <th>原价</th>
            <th>拼团价</th>
            <th>拼团人数</th>
            <th>参与人数</th>
            <th>成团数量</th>
            <th>限量</th>
            <th>剩余数量</th>
            <th>结束时间</th>
            <th class="f1">拼团状态</th>
            <th class="f2">操作</th>
          </tr>
          <tr v-for="item in currentList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <img width="30" :src="item.img" alt="" />
            </td>
            <td class="name">{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.spellPrice }}</td>
            <td>{{ item.spellPeople }}</td>
            <td>{{ item.joinPeople }}</td>
            <td>{{ item.spellNumber }}</td>
            <td>{{ item.limit }}</td>
            <td>{{ item.residue }}</td>
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
              <button v-on:click="delModel(item.id)">删除</button>
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
            共<span>{{ searchList.length }}</span
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
import SearchVue from "../components/Search.vue";
import TableVue from "../components/Table.vue";
import FooterVue from "../components/Footer.vue";
import { spellGoods } from "../data/spellgoods";
export default {
  name: "Content",
  mixins: [],
  components: {
    TableVue,
    SearchVue,
    FooterVue,
  },
  props: {},
  data() {
    return {
      spellGoods,
      currentPage: 0,
      isShow: false,
      pageSize: 1,
      searchList: spellGoods,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.searchList.length / this.pageSize);
    },
    currentList() {
      let start = this.currentPage * this.pageSize;
      console.log(start, this.pageSize);
      return this.searchList.slice(start, start + this.pageSize);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delModel(data) {
      this.spellGoods.forEach((item, index) => {
        if (item.id == data) {
          this.spellGoods.splice(index, 1);
        }
      });
    },
    changePage(num) {
      this.currentPage = num;
    },
    jumpPage(event) {
      this.currentPage = event.target.value - 1;
    },
    switchSize(event) {
      this.pageSize = +event.target.value;
    },
    searchGoods() {
      this.searchList = this.spellGoods.filter((item) => {
        return item.name.includes(this.$refs.searchInput.value);
      });
      let f = this.$refs.selectStatus.value;
      console.log(f);
      if (f == 0) {
        this.searchList = this.searchList;
      } else if (f == 1) {
        this.searchList = this.searchList.filter((item) => {
          return !item.status;
        });
      } else {
        this.searchList = this.searchList.filter((item) => {
          return item.status;
        });
      }
      console.log(this.searchList);
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  background-color: #f5f5f5;
  overflow: auto;
  height: calc(100% - 50px);
  .bg {
    margin: 20px;
    background-color: #fff;
    text-align: left;
    position: relative;
    overflow: hidden;
    .tit {
      padding-bottom: 20px;
      border-bottom: 1px solid #e6ebf5;
      .search {
        display: flex;
        padding: 20px;
        .item {
          display: flex;
          margin-right: 30px;
          height: 36px;
          .name {
            flex-shrink: 0;
            font-size: 14px;
            color: #606266;
            padding-right: 12px;
            font-weight: bold;
            line-height: 36px;
          }
          select {
            width: 300px;
            height: 36px;
          }
        }
        .sItem {
          input {
            width: 245px;
          }
          button {
            width: 55px;
            height: 36px;
          }
        }
      }
      button {
        margin-left: 20px;
        width: 55px;
        height: 30px;
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
        }
        .name {
          text-align: left;
          min-width: 300px;
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
          width: 100px;
          line-height: 38px;
          // top: 30px;
          background-color: #fff;
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