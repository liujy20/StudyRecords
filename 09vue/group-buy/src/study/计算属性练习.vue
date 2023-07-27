<template>
  <div>
    <h1>身份证信息处理</h1>
    姓名: <input type="text" :value="user.name" ref="userName" /> <br />
    性别:
    <input
      type="radio"
      name="sex"
      value="男"
      ref="userGender"
      :checked="user.gender == '男'"
    />
    男
    <input type="radio" name="sex" value="女" :checked="user.gender == '女'" />
    女 <br />
    民族：<input type="text" :value="user.m" ref="userM" /> <br />
    年龄：<input type="text" :value="user.age" ref="userAge" /> <br />
    身份证号码：<input type="text" :value="user.ID" ref="userID" /> <br />
    地址： <input type="text" :value="user.area" ref="userArea" /> <br />
    <p>解析为身份证长字符串</p>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      ref="userInfo"
      :value="userInfoStr"
    ></textarea>
    <br />
    <button @click="get">获取</button>
    <button @click="set">解析</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        gender: "",
        m: "",
        age: "",
        ID: "",
        area: "",
      },
    };
  },
  methods: {
    get() {
      this.user.name = this.$refs.userName.value;
      this.user.m = this.$refs.userM.value;
      this.user.age = this.$refs.userAge.value;
      this.user.ID = this.$refs.userID.value;
      this.user.area = this.$refs.userArea.value;
      if (this.$refs.userGender.checked) {
        this.user.gender = "男";
      } else {
        this.user.gender = "女";
      }
      console.log(this.user);
    },
    set() {
      this.userInfoStr = this.$refs.userInfo.value;
    },
  },
  computed: {
    userInfoStr: {
      get() {
        let { name, m, age, ID, area, gender } = this.user;
        return `${name},${gender},${m},${age},${ID},${area}`;
      },
      set(value) {
        let arr = value.split(",");
        this.user.name = arr[0];
        this.user.gender = arr[1];
        this.user.m = arr[2];
        this.user.age = arr[3];
        this.user.ID = arr[4];
        this.user.area = arr[5];
      },
    },
  },
};
</script>

<style>
</style>