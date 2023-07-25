<template>
  <div class="table">
    <table v-if="products.length>0">
      <tr>
        <th>ID</th>
        <th>拼团图片</th>
        <th class="name">开团团长</th>
        <th>开团时间</th>
        <th>拼团商品</th>
        <th>拼团人数</th>
        <th>参与人数</th>
        <th>结束时间</th>
        <th class="f1">拼团状态</th>
        <th class="f2">操作</th>
      </tr>

      <tr v-for="item in products" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <img width="30" :src="item.img" alt="" />
        </td>
        <td class="name">{{ item.name }}</td>
        <td>{{ item.beginTime }}</td>
        <td class="info">
          <img width="30" :src="item.product.img" alt="" />
          <div>{{ item.product.name }}</div>
          <div>{{ item.product.price }}</div>
        </td>
        <td>{{ item.spellPeople }}</td>
        <td>{{ item.joinPeople }}</td>
        <td>{{ item.endTime }}</td>
        <td></td>
        <td></td>
        <td class="f1">
          <div class="bg" :class="item.status ? 'end' : 'online'">
            {{ item.status ? "已结束" : "未结束" }}
          </div>
        </td>
        <td class="f2">
          <button @click="isShow=!isShow">查看</button>
          <button @click="delModel(item.id)">删除</button>
        </td>
      </tr>
    </table>
    <div v-else>暂无数据</div>
    <div class="goodInfo" v-show="isShow">
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
      <button @click="isShow=!isShow">关闭</button>
    </div>
  </div>
  </div>
</template>

<script>
import{ products } from '../data/team'
export default {
  name: "Table",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      products,
      isShow:false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delModel(data) {
      this.products.forEach((item,index)=>{
        if(item.id==data){
          this.products.splice(index,1)
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  height: 100%;
  padding: 20px;
  overflow: auto;
  table {
    border-collapse: collapse;
    tr {
      font-size: 12px;
      text-align: center;
      height: 50px;
      &:hover {
        background-color: #f5f7fa;
        .f1,
        .f2 {
          background-color: #f5f7fa;
        }
      }
      th {
        padding: 6px 10px;
        color: #333;
        box-sizing: border-box;
        flex-shrink: 0;
        // background-color: #fff;
      }
      td {
        padding: 6px 10px;
        color: #606266;
        box-sizing: border-box;
        min-width: 100px;
        border-top: 1px solid #e6ebf5;
        // background-color: #fff;
      }
    }
    .name {
      text-align: left;
    }
    .info{
      min-width: 300px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    .f1 {
      position: absolute;
      right: 100px;
      height: 50px;
      width: 100px;
      line-height: 38px;
      // top: 30px;
      background-color: #fff;
      box-shadow: -4px 0 15px -4px rgba(0, 0, 0, 0.12);
      .end {
        margin: auto;
        width: 60%;
        background-color: lightblue;
        color: #fff;
      }
    }
    .f2 {
      position: absolute;
      right: 0;
      height: 50px;
      width: 120px;
      line-height: 38px;
      // top: 30px;
      background-color: #fff;
      button{
        margin: 0 5px;
      }
    }
  }
}
.goodInfo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000a;
  .box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 250px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: left;
    .tit {
      font-size: 26px;
      line-height: 50px;
      border-bottom: 3px solid #ccc;
      font-weight: bold;
    }
    .info {
      padding: 10px 0;
      .id,
      .name {
        display: flex;
        margin-top: 10px;
        span {
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