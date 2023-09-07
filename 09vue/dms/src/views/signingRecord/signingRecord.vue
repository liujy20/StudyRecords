<template>
  <div id="signing">
    <div class="content">
      <div class="signing-title"><span></span>签约记录</div>
      <div class="selectone">
        <div class="left">
          <div class="item">
            <span class="text">签约状态</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="text">签约机构</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="text">医生团队</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="right">导出</div>
      </div>
      <div class="selecttwo">
        <div class="item">
          <span class="text">服务包</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="text">选择日期</span>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="请选择日期"
            end-placeholder="请选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div class="item">
          <el-input
            placeholder="请输入关键字"
            suffix-icon="el-icon-search"
            v-model="input2"
            class="search"
          >
          </el-input>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
      <div class="pagin">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
#signing {
  width: calc(100vw - 200px);
  height: calc(100vh - 60px);
  background-color: rgb(242, 247, 251);
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  .top {
    text-align: left;
  }
  .content {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .signing-title {
      font-size: 18px;
      color: #333;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      text-align: left;
      span {
        background-color: #1877f2;
        display: inline-block;
        width: 6px;
        height: 20px;
        border-radius: 3px;
        margin-right: 10px;
      }
    }
    .selectone {
      display: flex;
      justify-content: space-between;
      width: 1150px;
      margin-bottom: 30px;
      .el-input {
        width: 200px;
        height: 40px;
      }
      .left {
        display: flex;
      }
      .right {
        width: 64px;
        height: 40px;
        border: 1px solid #1877f2;
        text-align: center;
        line-height: 40px;
        color: #1877f2;
        margin-right: 28px;
      }
      .item {
        .text {
          display: inline-block;
          color: #999;
          font-size: 13px;
          margin-right: 20px;
          width: 60px;
          text-align: right;
        }
        .el-select {
          margin-right: 20px;
        }
      }
    }
    .selecttwo {
      display: flex;
      // width: 1150px;
      margin-bottom: 30px;
      .item {
        margin-right: 20px;
        .el-input {
          width: 200px;
          height: 40px;
        }
        .search {
          width: 355px;
        }
        .text {
          display: inline-block;
          color: #999;
          font-size: 13px;
          margin-right: 20px;
          width: 60px;
          text-align: right;
        }
      }
    }
    .pagin {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
    }
  }
}
</style>