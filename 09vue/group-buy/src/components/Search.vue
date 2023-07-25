<template>
  <div class="search">
    <div class="item">
      <div class="name">拼团状态：</div>
      <select name="" id="">
        <option value="">关闭</option>
        <option value="">开启</option>
      </select>
    </div>
    <div class="item sItem">
      <div class="name">商品搜索：</div>
      <input type="text">
      <button>搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
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
  .search{
    display: flex;
    padding: 20px;
    .item{
      display: flex;
      margin-right: 30px;
      height: 36px;
      .name{
        flex-shrink: 0;
        font-size: 14px;
        color: #606266;
        padding-right: 12px;
        font-weight: bold;
        line-height: 36px;
      }
      select{
        width: 300px;
        height: 36px;
      }
    }
    .sItem{
      input{
        width: 245px;
      }
      button{
        width: 55px;
        height: 36px;
      }
    }
  }
</style>