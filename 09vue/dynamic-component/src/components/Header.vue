<template>
  <div id="header">
    <span v-for="(item,index) in path" :key="item" >
    {{ item }}  {{ index < path.length -1 ? "/" :"" }}
    </span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      path:["营销","拼团管理","拼团商品"],
    }
  }
}
</script>

<style lang="scss">
#header{
  padding-left: 10px; 
  padding-right: 10px;
    height: 60px;
    line-height: 60px;
    // text-align: center;
    background-color: #fff;
}
#header span:last-child{
  color: #aaa;
}
</style>