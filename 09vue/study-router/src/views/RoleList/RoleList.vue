<template>
  <el-main>
    <div class="search">
      <div class="name">用户搜索:</div>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="resetSearch">重置</el-button>
    </div>
    <div class="btns">
      <el-button type="primary" size="default" @click="dialogFormVisible=true"
        >添加角色</el-button
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

        <el-table-column prop="_id" label="角色编号">
          <template slot-scope="scope">
            <span
              >{{ scope.row._id.slice(0, 4) }}****{{
                scope.row._id.slice(-4)
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status">激活</el-tag>
            <el-tag type="danger" v-else>未激活</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色昵称"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>

        <el-table-column label="操作" width="150">
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
            <!-- 按钮级别权限控制 自定义方法 通过value获取插入数据 -->
            <el-button
              @click.native.prevent="deleteRow(scope.row._id)"
              type="text"
              size="small"
              v-super="scope.row"
            >
              彻底删除
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
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" @opened='openAddBox'>
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
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
        <el-form-item label="菜单权限" label-width="120px">
          <el-tree
            :data="rules"
            show-checkbox
            node-key="_id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="confirmForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="editFormVisible" @opened='initEdit'>
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
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
        <el-form-item label="菜单权限" label-width="120px">
          <el-checkbox v-model="isExpend" @change="changeExpendStatus">展开/折叠</el-checkbox>
          
          <el-tree
            :data="rules"
            show-checkbox
            node-key="_id"
            ref="tree"
            :props="defaultProps"
            :default-expanded-keys="expendNodes"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditForm">取 消</el-button>
        <el-button type="primary" @click="confirmEditForm">确 定</el-button>
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
      isExpend:false,
      expendNodes:[],
      rules: [],
      form: {
        rules: "",
        roleName: "",
        status: true,
      },
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 修改框
      editFormVisible: false,
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
    deleteRow(id) {},
    changeExpendStatus(){
      if(this.isExpend){
        this.expendNodes=this.rules.map(item=>{
          return item._id
        })
        console.log(this.expendNodes);
      }else{
        this.expendNodes=
        console.log(111);
      }
    },
    //==============================
    // 打开From表单
    openAddBox() {
      this.dialogFormVisible = true;
      this.$refs.tree.setCheckedKeys([]);
      this.form = {
        rules: "",
        roleName: "",
        status: true,
      };
    },
    // 提交表单
    async confirmForm() {
      this.form.rules = this.$refs.tree.getCheckedKeys().join(",");
      console.log(this.form);
      let res = await this.$http.roleHttp.addSystemUser(this.form);
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
      console.log(this.$refs.tree.getCheckedKeys(), this.form);
    },
    //==============================
    // 打开修改框
    openEditRow(val) {
      this.editFormVisible = true;
      this.form = { ...val };
      console.log(this.form);
    },
    // 渲染原数据
    initEdit(){
       this.$refs.tree.setCheckedKeys(this.form.rules.split(","));
    },
    // 提交表单
    async confirmEditForm() {
      this.form.rules = this.$refs.tree.getCheckedKeys().join(",");
      console.log(this.form);
      let res = await this.$http.roleHttp.modifySystemUser(this.form);
      console.log(res.data);
      if (res.data.meta.status == 200) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
        });
        this.getInfo();
        this.editFormVisible = false;
      } else {
        this.$message({
          message: res.data.meta.msg,
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
      let res = await this.$http.roleHttp.getSystemUser();
      console.log(res.data.data);
      this.getList = res.data.data;
      // 总页数
      this.totalUser = res.data.data.length;
    },
    // 获取权限
    async getRule() {
      let res = await this.$http.roleHttp.getSystemRule();
      console.log(res.data.data);
      this.rules = res.data.data;
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
  async created() {
    await this.getRule();
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