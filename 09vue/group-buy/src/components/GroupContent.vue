<template>
  <div class="content">
    <div class="num">
      <div class="card">
        <img :src="img" alt="">
        <div class="info">
          <div class="tit">参与人数(人)</div>
          <div class="count">107</div>
        </div>
      </div>
      <div class="card">
        <img :src="img" alt="">
        <div class="info">
          <div class="tit">参与人数(人)</div>
          <div class="count">107</div>
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="tit">
        <time-vue></time-vue>
      </div>
      <team-table-vue></team-table-vue>
    </div>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import FooterVue from "./Footer.vue";
import TimeVue from './Time.vue';

import img from '../assets/用户分析.png'
import TeamTableVue from './TeamTable.vue';

export default {
  name: "Content",
  mixins: [],
  components: {
    TimeVue,
    FooterVue,
    TeamTableVue
  },
  props: {},
  data() {
    return {
      img
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.content {
  background-color: #f5f5f5;
  overflow: auto;
  height: calc(100% - 50px);
  .num{
    display: flex;
    align-items: center;
    margin: 20px;
    .card{
      display: flex;

      width: 240px;
      height: 110px;
      padding: 25px;
      margin: 20px 20px 0 0;
      background-color: #fff;
      border-radius: 9px;
      box-sizing: border-box;
      img{
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      .info{
        text-align: left;
        .tit{
          font-size: 14px;
          color: #606266;
        }
        .count{
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }
      }
    }
  }
  .bg {
    margin: 20px;
    background-color: #fff;
    text-align: left;
    position: relative;

    .tit {
      padding-bottom: 20px;
      border-bottom: 1px solid #e6ebf5;
      button {
        margin-left: 20px;
        width: 55px;
        height: 30px;
      }
    }
  }
}
</style>