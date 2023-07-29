<template>
  <el-main>
    <div class="cards">
      <div class="card">
        <img :src="img" alt="" />
        <div class="info">
          <div class="tit">参与人数(人)</div>
          <div class="count">111</div>
        </div>
      </div>
      <div class="card">
        <img :src="img" alt="" />
        <div class="info">
          <div class="tit">成团人数(个)</div>
          <div class="count">222</div>
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
              v-model="searchDate"
              type="date"
              placeholder="选择日期"
              size="small"
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
        <el-table :data="products" style="width: 100%; font-size: 12px">
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
          :current-page="1"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
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
      // 日历日期
      searchDate: "",
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
      currentStatus: "",
    };
  },
  methods: {
    // 表格设置
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 页码
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