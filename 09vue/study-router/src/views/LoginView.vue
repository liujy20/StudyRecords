<template>
  <div class="bg">
    <div class="box">
      <img
        src="https://api.java.crmeb.net/crmebimage/maintain/2021/02/25/07475786dd394aafa8e3eea4dff27d83o5bbgsdz11.png"
        alt=""
      />
      <div class="content">
        <div class="logo">
          <img
            src="https://api.java.crmeb.net/crmebimage/operation/2021/02/05/275e60789951438c9cac5928bd2b0ec33brze97mkn.png"
            alt=""
          />
        </div>
        <div class="id item">
          <el-input
            clearable
            v-model="id"
            prefix-icon="el-icon-user"
            placeholder="6-10位字母或数字"
          ></el-input>
        </div>
        <div class="pwd item">
          <el-input
            clearable
            v-model="pwd"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </div>
        <div class="code item">
          <el-input
            clearable
            v-model="code"
            prefix-icon="el-icon-message"
          ></el-input>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAiCAIAAABHmckwAAAC30lEQVR42tXZPWgUQRQH8EusTCFIbCzUFNfYXROirbHJJSTWqRQ/8iGCKCS1pDi1ECw0RJuIREyraQKWQbGSpBGE6yIIgiCKBBOSzPrWyeybmTfvzX54DlMcucnmfvnPvJndq+11Rus9fa2aP1Tb65hWjblq8NTUzP8Hvn33cxlgn/n8zADxK5cmX8rAfROf4sxxbBpcgTlJOM58sv3W7qIrvB5q6p4HDGYmOxLs1ErNJnjk1otgD16QY07XMMfcc/93UMs0X5icU10KDubMMYvBTtvjldrH9qY054iEmWaCfVClmWafCplRSbPXKgGG/DmL+c70DWnUMjCRoQI/GRm2B5gqxPaB6W05pzmzD7cG30eDwYwGOLXazJzSQXPr+1X+9MYHD9osAgeRojVM71KEGUWdgp/1t/ODV2anfWD1lm/1xm1L/JDdU1qDaXOwDvvAdIlePn4iVR36Zo7R1MVH27r7PlvQPNtYLRFMa+1jljInwixYmxH4Z/dRNIzzHwHzwRrmmMsDr40fTnI2wLuD83wzE5wpWgA+9+5pNJg/n50HaTCbY5RZdd+sVmZgm2+JwbSZD/bdG9B3DrbZl7Buymy+FVzJMjBhRj9XWxQBdp5DfGa6dNnx0ubMPhxh9t08IDDd0a5jms1tKQjmlGs3WFSuUa/3foExOxvPReBgt20oXljSzYWLhJkCi84hEOyPK0lpBbMCE2fpuFMHMjsrGYSs2PWlU6rLnmkFT9e6NT5chxfarKNmVmnOAQtFShRnMNvs8EM8phmBodFmojWXX8GLm5fPcMDEwUuZk0/yl108GJlzgplm+rAJUQO7sOfSJjh/E4G51/zD7lCwaFb/m28eKgMX8M3DfKPeaeBWs5+Y1aL2sHvY7GnC5ZmPHBuLNi/e6yo85BS8vvYrv9kXcpwZQgZz8eBCzMSs5pvPvukpNeQM2Jzbm6tfi13Gyuxkj249sM3AVglrc1HgffiBYd42Sc9+AAAAAElFTkSuQmCC"
            alt=""
          />
        </div>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      pwd: "",
      code: "",
    };
  },
  methods: {
    async login() {
      // if (this.id != this.user.id) {
      //   this.$message({
      //     message: "id错误",
      //     type: "error",
      //   });
      // } else {
      //   if (this.pwd != this.user.pwd) {
      //     this.$message({
      //       message: "密码错误",
      //       type: "error",
      //     });
      //   } else {
      //     this.$message({
      //       message: "登陆成功",
      //       type: "success",
      //     });
      //     localStorage.setItem("user", this.user.name);
      //     this.$router.push({
      //       name: "content",
      //       params: {
      //         user: this.user.name,
      //       },
      //     });
      //   }
      // }
      let res = await axios({
        url: "http://localhost:4001/admin/login",
        method: "post",
        data: {
          account: this.id,
          pwd: this.pwd,
        },
      });
      if (res.data.code == 200) {
        localStorage.setItem("token", res.data.token);
        this.$message({
          message: res.data.msg,
          type: "success",
        });
        this.$router.push({
          name: "content",
        });
      }else{
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
  },
  // created() {
  //   this.user = JSON.parse(localStorage.getItem("userInfo"));
  // },
};
</script>

<style lang="scss">
.bg {
  height: 100vh;
  background-color: #050328;
  background-image: url("@/assets/bg.png");
}
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -350px;
  width: 700px;
  height: 400px;
  background-color: #fff;
  display: flex;
  .content {
    flex-grow: 1;
    padding: 40px;
    .logo {
      text-align: center;
    }
    .item {
      margin: 20px 0;
    }
    .code {
      .el-input {
        width: 260px;
      }
      img {
        vertical-align: middle;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>