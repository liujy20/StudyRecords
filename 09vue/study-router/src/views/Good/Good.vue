<template>
  <el-main>
    <div class="content">
      <div class="header">
        <div class="item">
          <div class="name">拼团状态：</div>
          <div class="selStatus">
            <el-select
              v-model="currentStatus"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="name">商品搜索：</div>
          <div class="search">
            <el-input
              placeholder="请输入内容"
              size="small"
              v-model="searchInput"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchGoods"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="item">
          <el-button size="small">导出</el-button>
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
          <el-table-column prop="name" label="拼团名称" width="300">
          </el-table-column>
          <el-table-column prop="price" label="原价" width="100">
          </el-table-column>
          <el-table-column prop="spellPrice" label="拼团价" width="100">
          </el-table-column>
          <el-table-column prop="spellPeople" label="拼团人数" width="100">
          </el-table-column>
          <el-table-column prop="joinPeople" label="参与人数" width="100">
          </el-table-column>
          <el-table-column prop="spellNumber" label="成团数量" width="100">
          </el-table-column>
          <el-table-column prop="limit" label="限量" width="100">
          </el-table-column>
          <el-table-column prop="residue" label="剩余数量" width="100">
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
          :total="totalData"
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
import { spellGoods } from "../../data/spellgoods";
export default {
  data() {
    return {
      spellGoods,
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
      // 搜索框数据
      searchInput: "",
      // 页码
      currentPage: 1,
      // 每页大小
      pageSize: 5,
      // 搜索结果
      searchList: spellGoods,
    };
  },
  methods: {
    // 表格搜索
    searchGoods() {
      this.searchList = this.spellGoods.filter((item) => {
        return item.name.includes(this.searchInput);
      });
    },
    // 表格设置
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 表格删除
    handleDelete(index, row) {
      console.log(index, row);
      spellGoods.splice(index, 1);
    },
    // 页面大小
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage=1
    },
    // 当前页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  computed: {
    totalData() {
      let f = this.currentStatus;
      console.log("状态-page函数", f);
      let result;
      if (f == 0) {
        result = this.searchList;
      } else if (f == 1) {
        result = this.searchList.filter((item) => {
          return !item.status;
        });
      } else {
        result = this.searchList.filter((item) => {
          return item.status;
        });
      }
      return result.length;
    },
    currentList() {
      let f = this.currentStatus;
      console.log("状态-渲染函数", f);
      let result;
      if (f == 0) {
        result = this.searchList;
      } else if (f == 1) {
        result = this.searchList.filter((item) => {
          return !item.status;
        });
      } else {
        result = this.searchList.filter((item) => {
          return item.status;
        });
      }
      let start = (this.currentPage - 1) * this.pageSize;
      if(start>=result.length){
        this.currentPage=1
        return result.slice(0, 0 + this.pageSize);
      }
      console.log("开始-结束下标", start, start + this.pageSize);
      return result.slice(start, start + this.pageSize);
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

  .content {
    margin: 0 0 20px;
    background-color: #fff;
    overflow: hidden;
    .header {
      padding: 20px;
      border-bottom: 1px solid #dcdfe6;
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
        .selStatus {
          margin-right: 20px;
          .el-select {
            width: 300px;
          }
        }
        .search {
          width: 300px;
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