<template>
  <el-main>
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">全部会员</el-menu-item>
      <el-menu-item index="2">精品会员</el-menu-item>
      <el-menu-item index="3">普通会员</el-menu-item>
    </el-menu> -->
    <div class="search">
      <div class="name">用户搜索:</div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>
    <div class="btns">
      <el-button type="primary" size="default" @click="openAddBox"
        >添加管理员</el-button
      >
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="getList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="account" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="avatar" label="头像" width="120">
          <template slot-scope="scope">
            <img width="30" :src="scope.row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="realName" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="200">
        </el-table-column>
        <el-table-column
          prop="roles[0].roleName"
          label="管理员权限"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.roles[0].roleName == '超级管理员'">{{
              scope.row.roles[0].roleName
            }}</el-tag>
            <el-tag type="info" v-else>{{
              scope.row.roles[0].roleName
            }}</el-tag>
          </template>
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

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="openEditRow(scope.row)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row._id)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="修改管理员" :visible.sync="editFormVisible">
      <el-form :model="form">
        <el-form-item label="管理员账号" label-width="120px">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" label-width="120px">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" label-width="120px">
          <el-input v-model="form.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员身份" label-width="120px">
          <el-select v-model="form.roles" placeholder="请选择活动区域" multiple>
            <el-option
              label="超级管理员"
              value="63bbaee5597cec08b02b6937"
            ></el-option>
            <el-option
              label="普通管理员"
              value="641b2743302800003b004c95"
            ></el-option>
            <el-option
              label="订单管理员"
              value="648199651218cb2cbcdfe544"
            ></el-option>
            <el-option
              label="设置管理员"
              value="6482819ce19ee023505c68f7"
            ></el-option>
            <el-option
              label="测试管理员"
              value="64828851e19ee023505c6986"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditForm">取 消</el-button>
        <el-button type="primary" @click="confirmEditForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="管理员账号" label-width="120px">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" label-width="120px">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" label-width="120px">
          <el-input v-model="form.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员身份" label-width="120px">
          <el-select v-model="form.roles" placeholder="请选择活动区域" multiple>
            <el-option
              label="超级管理员"
              value="63bbaee5597cec08b02b6937"
            ></el-option>
            <el-option
              label="普通管理员"
              value="641b2743302800003b004c95"
            ></el-option>
            <el-option
              label="订单管理员"
              value="648199651218cb2cbcdfe544"
            ></el-option>
            <el-option
              label="设置管理员"
              value="6482819ce19ee023505c68f7"
            ></el-option>
            <el-option
              label="测试管理员"
              value="64828851e19ee023505c6986"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开启"
            inactive-text="关闭"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="confirmForm">确 定</el-button>
      </div>
    </el-dialog>
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
      getList: [],
      totalUser: 1,
      // 添加框
      dialogFormVisible: false,
      form: {
        account: "",
        pwd: "",
        realName: "",
        phone: "",
        roles: [],
        status: true,
      },
      // 修改框
      editFormVisible:false,
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
    // totalUser() {
    //   return this.typeList.length;
    // },
  },
  methods: {
    // 删除
    // deleteRow(index, row) {
    //   console.log(index, row);
    //   this.users = this.users.filter((item) => {
    //     return item.uid != index;
    //   });
    // },
    async deleteRow(id) {
      let res = await await this.$http.userHttp.delUser({
        _id: id,
      });
      console.log(res.data);
      await this.getInfo();
    },
    //==============================
    // 打开From表单
    openAddBox() {
      this.dialogFormVisible = true;
      this.form = {
        account: "",
        pwd: "",
        realName: "",
        phone: "",
        roles: [],
        status: true,
      };
    },
    // 提交表单
    async confirmForm() {
      this.form.roles.sort()
      let res = await this.$http.userHttp.addUser(this.form);
      console.log(res);
      if (res.data.meta.status == 200) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
        });
        this.getInfo();
        this.dialogFormVisible = false;
      } else {
        this.$message({
          message: "添加失败",
          type: "warning",
        });
      }
    },
    // 取消表单
    cancelForm() {
      this.dialogFormVisible = false;
    },
    //==============================
    // 修改数据
    openEditRow(val){
      this.editFormVisible=true
      this.form={...val};
      this.form.roles=this.form.roles.map(item=>{
        return item._id
      })
    },
    // 提交表单
    async confirmEditForm() {
      this.form.roles.sort()
      let res = await this.$http.userHttp.modifyUser(this.form);
      console.log(res.data);
      if (res.data.meta.status == 200) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
        });
        this.getInfo();
        this.editFormVisible=false
      }else{
        this.$message({
          message: "修改失败",
          type: "warning",
        });
      }
    },
    // 取消表单
    cancelEditForm() {
      this.editFormVisible = false;
    },
    //==============================
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
    // 后端数据
    async getInfo() {
      let res = await this.$http.userHttp.getUser({
        page: this.currentPage,
        limit: this.pageSize,
      });
      console.log(res.data.data);
      this.getList = res.data.data;
      // 总页数
      let num = await await this.$http.userHttp.getAllPage({});
      this.totalUser = num.data.data.length;
    },
  },
  watch: {
    // 监听删除
    // users: {
    //   handler() {
    //     this.searchList = this.users.filter((item) => {
    //       return item.nickname.includes(this.input);
    //     });
    //   },
    //   deep: true,
    // },
    // 删除数据 页面判断
    // currentList() {
    //   let endPage = Math.ceil(this.typeList.length / this.pageSize);
    //   // 如果currentPage大于真实页数,渲染List为空,需要将currentPage-1
    //   if (this.currentPage > endPage && this.currentPage != 1)
    //     this.currentPage -= 1;
    // },
    currentList: {
      async handler() {
        await this.getInfo();
      },
      immediate: true,
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
    text-align: left;
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
  .el-form-item {
    font-weight: bold;
    text-align: left;
    span {
      margin-right: 10px;
      color: red;
    }
  }
}
</style>