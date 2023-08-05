<template>
  <el-main>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">全部会员</el-menu-item>
      <el-menu-item index="2">精品会员</el-menu-item>
      <el-menu-item index="3">普通会员</el-menu-item>
    </el-menu>
    <div class="search">
      <div class="name">用户搜索:</div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>
    <div class="btns">
      <el-button type="danger" @click="deleteMore">批量删除</el-button>
      <el-button>批量设置分组</el-button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="currentList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="uid" label="ID" width="120"> </el-table-column>
        <el-table-column prop="avatar" label="头像" width="120">
          <template slot-scope="scope">
            <img width="30" :src="scope.row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="level" label="用户等级" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.level ? "精品用户" : "普通用户" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="groupId" label="分组" width="120">
        </el-table-column>
        <el-table-column prop="partnerId" label="推荐人" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
          <template slot-scope="scope">
            <span
              >{{ scope.row.phone.slice(0, 4) }}****{{
                scope.row.phone.slice(-4)
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="nowMoney" label="余额" width="120">
        </el-table-column>
        <el-table-column prop="integral" label="积分" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"> 编辑 </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.uid, users)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >切换第二、第三行的选中状态</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalUser"
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
import { users } from "../../data/users";
export default {
  data() {
    return {
      users,
      activeIndex: "1",
      input: "",
      searchList: users,
      // 选择的表格项
      multipleSelection: [],
      // 当前页
      currentPage: 1,
      // 页面大小
      pageSize: 5,
    };
  },
  computed: {
    // 用户类型列表
    typeList() {
      if (this.activeIndex == 1) {
        return this.searchList;
      } else if (this.activeIndex == 2) {
        return this.searchList.filter((item) => {
          return item.level == 1;
        });
      } else {
        return this.searchList.filter((item) => {
          return item.level == 0;
        });
      }
    },
    // 当前渲染表单
    currentList() {
      let start = (this.currentPage - 1) * this.pageSize;
      return this.typeList.slice(start, start + this.pageSize);
    },
    // 总数据数量
    totalUser() {
      return this.typeList.length;
    },
  },
  methods: {
    // 删除
    deleteRow(index, row) {
      console.log(index, row);
      this.users = this.users.filter((item) => {
        return item.uid != index;
      });
    },
    // 搜索
    search() {
      this.currentPage = 1;
      this.searchList = this.users.filter((item) => {
        return item.nickname.includes(this.input);
      });
    },
    // 重置搜索
    resetSearch() {
      this.input = "";
      this.search();
    },
    // 用户类型选择
    handleSelect(key) {
      this.activeIndex = key;
      this.currentPage = 1;
    },
    // 页面大小
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 获取选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    deleteMore() {
      this.users = this.users.filter((item) => {
        return !this.multipleSelection.find((val) => {
          return item.uid == val.uid;
        });
      });
    },
  },
  watch: {
    // 监听删除
    users: {
      handler() {
        this.searchList = this.users.filter((item) => {
          return item.nickname.includes(this.input);
        });
      },
      deep:true
    },
    // 删除数据 页面判断
    currentList(){
      let endPage=Math.ceil(this.typeList.length/this.pageSize)
      // 如果currentPage大于真实页数,渲染List为空,需要将currentPage-1
      if(this.currentPage>endPage&&this.currentPage!=1)
      this.currentPage-=1
    },
    currentPage() {
      console.log(this.currentPage);
    },
  },
};
</script>

<style scoped lang="scss">
.el-main {
  background-color: #f5f5f5;
  color: #333;
  padding: 0 20px !important;
  height: 1px !important;
  overflow: auto !important;
  .el-menu {
    padding: 0 20px;
  }
  .search {
    display: flex;
    height: 40px;
    padding: 20px 20px;
    background-color: #fff;
    border-bottom: 2px dashed #ccc;
    .name {
      font-size: 16px;
      line-height: 40px;
      font-weight: bold;
    }
    .el-input {
      margin-right: 700px;
      width: 300px;
    }
  }
  .btns {
    background-color: #fff;
    padding: 20px;
    border-bottom: 1px solid #ccc;
  }
  .table {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    .el-dropdown-link {
      padding: 0 0 0 5px;
      font-size: 12px;
      cursor: pointer;
      color: #409eff;
    }
    .block {
      padding: 20px;
      text-align: right;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    span {
      padding: 10px;
    }
  }
}
</style>