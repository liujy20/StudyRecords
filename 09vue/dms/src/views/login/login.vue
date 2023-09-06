<template>
  <div id="login">
    <div class="content">
      <div class="left">
        <div class="title">家庭医生后台管理系统</div>
        <img src="./../../assets/u1111.png" alt="" />
      </div>
      <div class="right">
        <img src="./../../assets/u408.jpg" alt="" />
        <div class="title">欢迎登录</div>
        <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
        <el-input v-model="password" placeholder="请输入密码"></el-input>
        <div class="agreement">
          <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
          <span class="text">《用户隐私政策》</span>
        </div>
        <el-button type="primary">登录</el-button>
        <div class="tips">忘记密码请联系管理员</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      checked: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(242, 247, 251);
  .content {
    width: 1200px;
    height: 660px;
    display: flex;

    .left {
      width: 600px;
      height: 660px;
      background-color: rgb(41, 132, 248);
      border-radius: 10px 0 0 10px;
      position: relative;
      img {
        position: absolute;
        bottom: 180px;
        left: 100px;
      }

      .title {
        padding: 20px;
        box-sizing: border-box;
        color: #fff;
      }
    }
    .right {
      width: 600px;
      height: 660px;
      background-color: #fff;
      border-radius: 0 10px 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 130px;
      box-sizing: border-box;

      img {
        width: 40px;
        height: 40px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 40px;
      }
      .el-input {
        width: 335px;
        height: 44px;
        margin-bottom: 20px;
        input {
          border-radius: 10px;
        }
      }
      .agreement {
        width: 335px;
        font-size: 13px;
        margin-bottom: 20px;
        .text {
          color: #1877f2;
        }
      }
      button {
        width: 335px;
        height: 44px;
        background-color: #1877f2;
        border-radius: 10px;
        margin-bottom: 20px;
      }
      .tips {
        color: #ccc;
        font-size: 13px;
      }
    }
  }
}
</style>