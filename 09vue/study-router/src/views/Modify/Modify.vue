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
      <div class="item">
        <div class="name"><span>*</span>原始密码</div>
        <el-input v-model="oldPwd"></el-input>
      </div>
      <div class="item">
        <div class="name"><span>*</span>新密码</div>
        <el-input v-model="newPwd1"></el-input>
      </div>
      <div class="item" v-if="newPwd1 != ''">
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
    };
  },
  methods: {
    submit() {
      if (
        this.newName != this.name &&
        this.oldPwd == "" &&
        this.newPwd1 == "" &&
        this.newPwd2 == ""
      ) {
        let user = {
          id: this.id,
          name: this.newName,
          pwd: this.pwd,
        };
        this.name = this.newName;
        localStorage.setItem("userInfo", JSON.stringify(user));
        bus.$emit("user", this.newName);
        this.$message({
          message: "用户名修改成功",
          type: "success",
        });
        return;
      }
      if (this.oldPwd != this.pwd) {
        this.$message({
          message: "密码错误",
          type: "warning",
        });
        return;
      }
      if (this.newPwd1 != this.newPwd2) {
        this.$message({
          message: "两次输入密码不同",
          type: "warning",
        });
      }
      if (this.newName == "" || this.newPwd1 == "" || this.newPwd2 == "") {
        this.$message({
          message: "输入不能为空",
          type: "warning",
        });
      }
      let user = {
        id: this.id,
        name: this.newName,
        pwd: this.newPwd1,
      };
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.removeItem("user");
      this.$router.push({
        name: "content",
      });
    },
    cancel() {
      this.oldPwd = "";
      this.newPwd1 = "";
      this.newPwd2 = "";
      this.newName = this.name;
    },
  },
  created() {
    let user = JSON.parse(localStorage.getItem("userInfo"));
    this.id = user.id;
    this.pwd = user.pwd;
    this.name = user.name;
    this.newName = user.name;
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
    }else{
      next()
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