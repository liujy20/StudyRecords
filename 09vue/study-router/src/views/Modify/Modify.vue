<template>
  <div class="wrap">
    <div class="con">
      <div class="item">
        <div class="name"><span>*</span>管理员账号</div>
        <el-input disabled v-model="id"></el-input>
      </div>
      <div class="item">
        <div class="name"><span>*</span>管理员姓名</div>
        <el-input v-model="newName"></el-input>
      </div>
      <div class="item" v-if="null">
        <div class="name"><span>*</span>原始密码</div>
        <el-input v-model="oldPwd"></el-input>
      </div>
      <div class="item">
        <div class="name"><span>*</span>新密码</div>
        <el-input v-model="newPwd1"></el-input>
      </div>
      <div class="item" v-if="null && newPwd1 != ''">
        <div class="name"><span>*</span>确认新密码</div>
        <el-input v-model="newPwd2"></el-input>
      </div>
      <div class="item">
        <div class="name"></div>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/util/bus";
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      newName: "",
      oldPwd: "",
      newPwd1: "",
      newPwd2: "",

      pwd: "",
      name: "",
      user: {},
    };
  },
  methods: {
    async submit() {
      this.user.realName = this.newName;
      this.user.pwd = this.newPwd1;
      console.log(this.user);
      let res = await this.$http.userHttp.modifyUser(this.user);
      console.log(res.data);
      if (res.status == 200) {
        bus.$emit("user");
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.info();
      }
    },
    cancel() {
      this.oldPwd = "";
      this.newPwd1 = "";
      this.newPwd2 = "";
      this.newName = this.name;
    },
    async info() {
      let res = await axios.get("http://localhost:4001/admin/getUserInfo", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(res.data.userInfo);
      this.user = res.data.userInfo;
      this.id = this.user.account;
      this.pwd = this.user.pwd;
      this.name = this.user.realName;
      this.newName = this.user.realName;
      this.oldPwd = "";
      this.newPwd1 = "";
      this.newPwd2 = "";
    },
  },
  created() {
    this.info();
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.newName != this.name ||
      this.oldPwd != "" ||
      this.newPwd1 != "" ||
      this.newPwd2 != ""
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