<template>
  <div class="wrap">
    <div class="con">
      <div class="item">
        <div class="name"><span>*</span>管理员账号</div>
        <el-input v-model="account"></el-input>
      </div>
      <div class="item">
        <div class="name"><span>*</span>管理员姓名</div>
        <el-input v-model="name"></el-input>
      </div>
      <div class="item">
        <div class="name"><span>*</span>管理员密码</div>
        <el-input v-model="pwd"></el-input>
      </div>
      <div class="item">
        <div class="name"><span>*</span>管理员手机号</div>
        <el-input v-model="phone"></el-input>
      </div>

      <div class="item">
        <div class="name"></div>
        <el-button type="primary" @click="submit">添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      account: "",
      name: "",
      pwd: "",
      phone: "",
    };
  },
  methods: {
    async submit() {
      let user = {
        account: this.account,
        pwd: this.pwd,
        phone: this.phone,
        realName: this.name,
        roles: "63bbaee5597cec08b02b6937",
        status: true,
      };
      let res=await this.$http.userHttp.addUser(user)
      console.log(res);
      if(res.status==200){
        this.$message({
          message:res.data.meta.msg,
          type:'success'
        })
        this.cancel()
      }else{
        this.$message({
          message:'添加失败',
          type:'warning'
        })
      }
    },
    cancel(){
      this.account= "";
      this.name= "";
      this.pwd= "";
      this.phone= ""
    }
  },
  created() {},
  beforeRouteLeave(to, from, next) {
    if (
      this.account != "" ||
      this.name != "" ||
      this.pwd != "" ||
      this.phone != ""
    ) {
      this.$confirm("有数据为保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  },
};
</script>

<style lang="scss">
.wrap {
  height: 100%;
  background-color: #f5f5f5;
  .con {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    .item {
      margin: 20px 0;
      display: flex;
      align-items: center;
      .name {
        padding-right: 20px;
        width: 100px;
        text-align: right;
        color: #606266;
        font-size: 14px;
        font-weight: bold;
        span {
          color: red;
          padding-right: 5px;
        }
      }
      .el-input {
        width: 1100px;
      }
    }
  }
}
</style>