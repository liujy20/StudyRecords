<template>
  <div>
    <!-- <son-vue>
    <template v-slot:header>
      <h1>header</h1>
    </template>
    <template v-slot:main="scope">
      <h2>main</h2>
      {{scope}}
    </template>
    <template v-slot:footer>
      <h3>footer</h3>
    </template>
  </son-vue> -->
    <son-vue :info="info" :phone="phone"></son-vue>
    <el-button @click="change" size="mini">修改</el-button>
    {{phone}}
  </div>
</template>

<script>
import SonVue from "./Son.vue";
export default {
  data(){
    return{
      info:{
        name:"",
        age:0
      },
      phone:""
    }
  },
  components: {
    SonVue,
  },
  methods:{
    change(){
      this.phone='123123123'
      this.info={
        name:"xwg",
        age:12
      }
    }
  }
};
</script>

<style>
*{
  color: #99a;
}
</style>