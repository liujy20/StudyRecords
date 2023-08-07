<template>
  <li>
      <slot></slot>
    <button class="edit" @click="editInfo">修改</button>
    <button @click="changeInfo">{{flag?'确认完成':'确认取消'}}</button>
    <button @click="delInfo">删除</button>
  </li>
</template>

<script>
export default {
  props:['flag','info'],
  methods:{
    editInfo(){
      this.$emit('editInfo',this.info,this.flag)
    },
    changeInfo(){
      this.$emit('changeInfo',this.info,this.flag)
    },
    delInfo(){
      this.$emit('delInfo',this.info,this.flag)
    },
  }
};
</script>

<style>
</style>