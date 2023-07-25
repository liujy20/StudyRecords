<template>
  <div class="goodInfo">
    <div class="box">
      <div class="tit">拼团商品详情</div>
      <div class="info">
        <div class="id">
          <span class="s1">编号</span>:
          <span class="s2">123</span>
        </div>
        <div class="name">
          <span class="s1">商品名称</span>:
          <span class="s2">香薰</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodInfo",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.goodInfo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000a;
  .box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 200px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: left;
    .tit{
      font-size: 26px;
      line-height: 50px;
      border-bottom: 3px solid #ccc;
        font-weight: bold;

    }
    .info{
      padding: 10px 0;
      .id,.name{
        display: flex;
        margin-top: 10px;
        span{
          margin-right: 10px;
          height: 30px;
          width: 120px;
          border-bottom: 1px dashed #ccc;
        }
      }
    }
  }
}
</style>