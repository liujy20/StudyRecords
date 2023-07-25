<template>
  <div class="header">
    <div class="change"></div>
    <div class="breadcrumb" v-for="(item,index) in linkArr" :key='item'>
      <a href="">{{ item }}</a>
      <span v-if="index!=linkArr.length-1">/</span>
    </div>
    <!-- <div class="breadcrumb">
      <a href="">主页</a>
      <span>/</span>
    </div>
    <div class="breadcrumb">
      <a href="">主页</a>
      <span></span>
    </div> -->
    <div class="space"></div>
    <div class="tool">1</div>
    <div class="tool">2</div>
    <div class="tool">3</div>
    <div class="user">demo</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
      linkArr:['主页','营销','拼团管理']
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
  .header{
    position: relative;
    color: #303133;
    background-color: #fff;
    height: 50px;
    display: flex;
    .change{
      padding: 0 15px;
    }
    .breadcrumb{
      line-height: 50px;
      span{
        padding: 0 10px;
      }
    }
    .space{
      flex-grow: 1;
    }
    .tool,.user{
      padding: 0 10px;
      line-height: 50px;
    }
    .user{
      margin-right: 30px;
    }

  }
</style>