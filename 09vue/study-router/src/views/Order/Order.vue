<template>
  <el-main>
    <search-vue :search="search" @getSearch="getSearch"></search-vue>
    <div class="table">
      <el-table :data="searchList" style="width: 100%">
        <el-table-column prop="orderId" label="订单号" width="230">
        </el-table-column>
        <el-table-column prop="orderType" label="订单类型" width="120">
        </el-table-column>
        <el-table-column prop="realName" label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="productList" label="商品信息" width="400">
          <template slot-scope="scope">
            <div class="infos">
              <img
                width="30"
                :src="scope.row.productList[0].info.image"
                alt=""
              />
              <span class="info">{{
                scope.row.productList[0].info.productName
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="payPrice" label="实际支付" width="80">
        </el-table-column>
        <el-table-column prop="payTypeStr" label="支付方式" width="80">
        </el-table-column>
        <el-table-column prop="statusStr.value" label="订单状态" width="100">
          <template slot-scope="scope">
            <span
              v-if="scope.row.statusStr.value == '申请退款'"
              style="color: rgb(241, 36, 199)"
              >申请退款</span
            >
            <span v-else>{{ scope.row.statusStr.value }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="getOrder(scope.row)"
                  >订单详情</el-dropdown-item
                >
                <el-dropdown-item @click.native="delOrder(scope.row)"
                  >订单删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
      >
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
import SearchVue from "./components/Search.vue";
import { list } from "../../data/order.js";
export default {
  components: {
    SearchVue,
  },
  data() {
    return {
      list,
      currentPage: 1,
      search: {
        type: "全部",
        status: "全部",
        startTime: "",
        endTime: "",
        input: "",
      },
      searchList: list,
    };
  },
  computed: {},
  methods: {
    // 获取信息
    getOrder(val) {
      console.log(val);
    },
    // 删除
    delOrder(val) {
      console.log(val);
      this.list=this.list.filter(item=>{
        return item.orderId!=val.orderId
      })
      this.getSearch(this.search)
    },
    // 获取筛选信息
    getSearch(val) {
      this.search = JSON.parse(JSON.stringify(val));
      console.log(this.search);
      let temp = this.list;
      // type
      if (this.search.type == "商城订单") {
        temp = temp.filter((item) => {
          return item.type == 0;
        });
      } else if (this.search.type == "视频号订单") {
        temp = temp.filter((item) => {
          return item.type == 1;
        });
      }
      // status
      if (this.search.status != "全部") {
        temp = temp.filter((item) => {
          return item.statusStr.value == this.search.status;
        });
      }
      //time
      if(this.search.startTime!=""&&this.search.endTime!=""){
        temp=temp.filter((item) => {
          let tempObj = new Date(item.createTime);
          let time = tempObj.getTime();
          return time >= this.search.startTime && time < this.search.endTime;
        });
      }
      this.searchList = temp;
      // 订单号
      if (this.search.input != "") {
        temp.forEach((item) => {
          if (item.orderId == this.search.input) {
            this.searchList = [item];
          }
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss">
.el-main {
  background-color: #f5f5f5;
  color: #333;
  padding: 0 20px !important;
  height: 1px !important;
  overflow: auto !important;
  .table {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    .el-table {
      font-size: 12px;
      .infos {
        display: flex;
        align-items: center;
        .info {
          margin-left: 5px;
          overflow: hidden; /* 规定如果元素内容溢出，则隐藏超出部分 */
          white-space: nowrap; /* 规定不换行显示 */
          text-overflow: ellipsis; /* 规定超出部分的文本显示为省略号 */
        }
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
  .block {
    background-color: #fff;
    text-align: right;
    padding: 0 10px 10px 0;
    margin-bottom: 40px;
  }
}
</style>