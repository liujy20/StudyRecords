<template>
  <div>
    <h1>身份证信息处理</h1>
    <div class="item">姓名: <input type="text" v-model="user.name" /></div>
    <div class="item">
      性别:
      <input type="radio" name="sex" value="男" v-model="user.gender" />
      男
      <input type="radio" name="sex" value="女" v-model="user.gender" />
      女
    </div>
    <div class="item">
      爱好：
      <input type="checkbox" id="" v-model="user.habbit" value="1" />1
      <input type="checkbox" id="" v-model="user.habbit" value="2" />2
      <input type="checkbox" id="" v-model="user.habbit" value="3" />3
      <input type="checkbox" id="" v-model="user.habbit" value="4" />4
    </div>
    <div class="item">民族：<input type="text" v-model="user.m" /></div>
    <div class="item">年龄：<input type="text" v-model="user.age" /></div>
    <div class="item">身份证号码：<input type="text" v-model="user.ID" /></div>
    地址： <input type="text" v-model="user.area" />
    <p>解析为身份证长字符串</p>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="userInfoStr"
    ></textarea>
    <br />
    <button @click="reset">reset</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        gender: "",
        habbit: [],
        m: "",
        age: "",
        ID: "",
        area: "",
      },
    };
  },
  methods: {
    reset() {
      this.user = {
        name: "",
        gender: "",
        habbit: "",
        m: "",
        age: "",
        ID: "",
        area: "",
      };
    },
  },
  computed: {
    userInfoStr: {
      get() {
        let { name, m, age, ID, area, gender, habbit } = this.user;
        return `${name},${gender},${habbit},${m},${age},${ID},${area}`;
      },
      set(value) {
        let arr = value.split(",");
        this.user.name = arr[0];
        this.user.gender = arr[1];
        this.user.habbit=arr[2]
        this.user.m = arr[3];
        this.user.age = arr[4];
        this.user.ID = arr[5];
        this.user.area = arr[6];
      },
    },
  },
};
</script>

<style>
</style>