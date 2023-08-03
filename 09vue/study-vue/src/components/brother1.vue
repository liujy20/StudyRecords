<template>
  <h1>brother1 发起消息
  <el-button @click="postMsg">发送消息</el-button>
  </h1>
</template>

<script>
import bus from '../util/bus'
export default {
  methods:{
    postMsg(){
      bus.$emit('msg','hello vue')
    }
  }
}
</script>

<style>

</style>