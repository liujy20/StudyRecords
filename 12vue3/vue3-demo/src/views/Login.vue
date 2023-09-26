<script lang='ts' setup>
import { TabsPaneContext } from 'element-plus';
import { Search, User, Lock } from '@element-plus/icons-vue'
import {login} from '@/apis/userApi'
const activeName = ref('first')
const input1 = ref('')
const input2 = ref('')

const account =ref<string>('')
const password =ref<string>('')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const submit=async ()=>{
  let res=await login(JSON.stringify({account,password}))
  console.log(res);
  
}
</script>

<template>
  <div class="bg">
    <div class="wrap">
      <div class="main">
        <div class="tit">
          <el-image src="http://xawn.x3322.net:8002/distremote/static/img/logo.png" class="logo"></el-image>
          <div class="name">赤兔养车</div>
        </div>
        <el-tabs :stretch="true" v-model="activeName" class="demo-tabs tab" @tab-click="handleClick">
          <el-tab-pane label="账户密码登录" name="first">
            <el-input v-model="account" placeholder="Please input account" class="item" :prefix-icon="User" />
            <el-input v-model="password" placeholder="Please input password" class="item" :prefix-icon="Lock" />
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="second">
            <el-input v-model="input1" placeholder="Please input" class="item" :prefix-icon="Search" />
            <div class="code">
              <el-input v-model="input2" placeholder="Please input" class="item inp" :prefix-icon="Search" />
              <el-button size="default">获取验证码</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" size="default" class="login" @click="submit">登录</el-button>
        <el-row justify="space-between" class="more">
          <el-col :span="6">
            <el-link type="primary" :underline="false">注册账户</el-link>
          </el-col>
          <el-col :span="6" class="span">
            <el-link type="primary" :underline="false">商家入住</el-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer">
      Copyright @ 2023 <el-link type="primary" :underline="false">admin</el-link>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bg {
  height: 100vh;
  width: 100%;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .wrap {
    padding: 116px 0 10px;

    .main {
      margin: auto;
      width: 400px;
      // background-color: antiquewhite;

      .tit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;

        .logo {
          margin-right: 20px;
          width: 40px;
          height: 20px;
        }

        .name {
          font-size: 28px;
          font-weight: bold;
        }
      }

      .tab {
        .el-tabs__nav {
          width: 100% !important;
        }

        .item {
          margin: 0 0 20px 0;

        }

        .code {
          display: flex;
          justify-content: space-between;

          .inp {
            margin-right: 20px;
          }
        }
      }

      .login {
        width: 100%;
      }

      .more {
        margin-top: 20px;

        .span {
          text-align: right;
        }
      }
    }
  }

  .footer {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #000073;
  }
}</style>