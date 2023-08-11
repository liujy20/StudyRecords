<template>
  <div>
    <h1>axios</h1>
    <el-button @click="common">获取信息</el-button>
    <el-button @click="getAxios">get获取信息</el-button>
    <el-button @click="postAxios">post获取信息</el-button>
    <h2>{{ token }}</h2>
    <h2>{{ info }}</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: "",
      info: "",
    };
  },
  methods: {
    async common() {
      let res = await axios({
        url: "/admin/login",
        method: "post",
        data: {
          account: "admin",
          pwd: "123456",
        },
      });
      localStorage.setItem("token", res.data.token);
      this.token = res.data;
    },
    async getAxios() {
      let res = await axios.get("/admin/getUserInfo", {
        headers:{Authorization: localStorage.getItem("token"),}
      });
      console.log(res.data);
      // this.info = res.data;
    },
    async postAxios() {
      console.log(111);
    },
  },
};
</script>

<style>
</style>