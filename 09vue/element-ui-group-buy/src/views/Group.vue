<template>
  <el-main>
    <div class="cards">
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
    <div class="content">
      <div class="header">
        <div class="item">
          <div class="name">时间选择：</div>
          <div class="timeBtns">
            <el-radio-group v-model="currentTime" size="small">
              <el-radio-button
                v-for="(item, index) in TimeArr"
                :key="item"
                :label="index"
                >{{ item }}</el-radio-button
              >
            </el-radio-group>
          </div>
          <div>
            <el-date-picker
              :disabled="dateIsDisabled"
              v-model="searchDate"
              type="daterange"
              size="small"
              unlink-panels
            >
            </el-date-picker>
          </div>
        </div>
        <div class="item">
          <div class="name">拼团选择：</div>
          <el-select v-model="currentStatus" placeholder="请选择" size="small">
            <el-option
              v-for="item in statusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="body">
        <el-table :data="currentList" style="width: 100%; font-size: 12px">
          <el-table-column prop="id" label="ID" width="50"> </el-table-column>
          <el-table-column prop="img" label="图片" width="60">
            <template slot-scope="scope">
              <img style="width: 30px; height: 30px" :src="scope.row.img" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="开团团长" width="120">
          </el-table-column>
          <el-table-column prop="beginTime" label="开始时间" width="140">
          </el-table-column>
          <el-table-column prop="product.name" label="拼团商品" width="300">
          </el-table-column>
          <el-table-column prop="spellPeople" label="拼团人数" width="120">
          </el-table-column>
          <el-table-column prop="joinPeople" label="参与人数" width="120">
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="140">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="zip"
            label="状态"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status ? 'danger' : 'info'"
                disable-transitions
                >{{ scope.row.status ? "已结束" : "未结束" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="isChoose"
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        >
        </el-pagination>
      </div>
    </div>
    <div class="footer">
      <span>官网</span>
      <span>社区</span>
      <span>文档</span>
    </div>
  </el-main>
</template>

<script>
import { products } from "../data/team";
import img from "../assets/用户分析.png";
export default {
  data() {
    return {
      img,
      products,
      // 时间
      TimeArr: [
        "全部",
        "今天",
        "昨天",
        "最近7天",
        "最近30天",
        "本月",
        "本年",
        "自定义时间",
      ],
      // 时间按钮
      currentTime: 0,
      // 开始时间
      startTime: "",
      // 结束时间
      endTime: "",
      // 时间是否可选择
      dateIsDisabled: true,
      // 日历日期
      searchDate: [],
      // 状态
      statusArr: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "进行中",
        },
        {
          value: "2",
          label: "已结束",
        },
      ],
      currentStatus: "0",
      // 页码
      currentPage: 1,
      // 每页大小
      pageSize: 5,
    };
  },
  methods: {
    // 表格设置
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 表格删除cd
    handleDelete(index, row) {
      console.log(index, row);
      this.products=this.products.filter(item=>{
        return item.id!=row.id
      });
    },
    // 页面大小
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    // 当前页面
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  computed: {
    // 团队数量
    groupCount() {
      let count = 0;
      this.products.forEach((item) => {
        count += Math.ceil(item.joinPeople / item.spellPeople);
      });
      return count;
    },
    // 人员数量
    peopleCount() {
      return this.products.reduce((prev, next) => {
        return prev + next.joinPeople;
      }, 0);
    },
    // 时间筛选数组
    timeList() {
      if (this.currentTime != 0) {
        return this.products.filter((item) => {
          let tempObj = new Date(item.beginTime);
          let time = tempObj.getTime();
          return time >= this.startTime && time < this.endTime;
        });
      }
      return this.products;
    },
    // 状态筛选数组
    statusList() {
      if (this.currentStatus == 0) {
        return this.timeList;
      } else if (this.currentStatus == 1) {
        return this.timeList.filter((item) => {
          return !item.status;
        });
      } else {
        return this.timeList.filter((item) => {
          return item.status;
        });
      }
    },
    // 当前团队列表
    currentList() {
      let start = (this.currentPage - 1) * this.pageSize;
      return this.statusList.slice(start, start + this.pageSize);
    },
    // 数据条数
    totalPage() {
      return this.statusList.length;
    },
  },
  watch: {
    // 确定时间
    currentTime(num) {
      this.dateIsDisabled = true;
      this.currentTime = num;
      let today = new Date(); //当前时间
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      today.setDate(today.getDate() + 1);
      switch (num) {
        case 0:
          // 全部
          this.startTime = "";
          this.endTime = "";
          break;
        case 1:
          // 今天
          this.endTime = today.getTime();
          today.setDate(today.getDate() - 1);
          this.startTime = today.getTime();
          break;
        case 2:
          // 昨天
          today.setDate(today.getDate() - 1);
          this.endTime = today.getTime();
          today.setDate(today.getDate() - 1);
          this.startTime = today.getTime();
          break;
        case 3:
          // 最近7天
          this.endTime = today.getTime();
          today.setDate(today.getDate() - 7);
          this.startTime = today.getTime();
          break;
        case 4:
          // 最近30天
          this.endTime = today.getTime();
          today.setDate(today.getDate() - 30);
          this.startTime = today.getTime();
          break;
        case 5:
          // 本月
          this.endTime = today.getTime();
          let endData = today.getDate();
          if (endData == 1) {
            today.setMonth(today.getMonth() - 1);
          }
          today.setDate(1);
          console.log(today.toLocaleString());
          this.startTime = today.getTime();
          break;
        case 6:
          // 本年
          this.endTime = today.getTime();
          today.setMonth(0);
          today.setDate(1);
          this.startTime = today.getTime();
          // console.log(today.toLocaleString());
          break;
        case 7:
          this.startTime = "";
          this.endTime = "";
          this.dateIsDisabled = false;
          break;
      }
    },
    // 选择时间范围
    searchDate(value) {
      console.log(value);
      if (!value) {
        this.startTime = "";
        this.endTime = "";
        return;
      }
      let day1 = new Date(value[0]);
      let day2 = new Date(value[1]);
      this.startTime = day1.getTime();
      day2.setDate(day2.getDate() + 1);
      this.endTime = day2.getTime();
    },
  },
};
</script>

<style lang="scss">
.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 0 20px !important;
  height: 1px !important;
  overflow: auto !important;
  .cards {
    display: flex;
    align-items: center;
    .card {
      display: flex;
      width: 300px;
      height: 110px;
      padding: 25px;
      margin: 10px 20px 20px 0;
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
  .content {
    margin: 0 0 20px;
    background-color: #fff;
    overflow: hidden;
    .header {
      padding: 20px;
      border-bottom: 1px solid #ccc;
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
        .timeBtns {
          margin-right: 20px;
        }
      }
    }
    .body {
      padding: 20px;
      .el-table-column {
        font-size: 12px !important;
      }
    }
    .page {
      text-align: right;
      margin: 0 10px 20px 0;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 40px;
    font-size: 14px;
    span {
      padding: 0 10px;
    }
  }
}
</style>