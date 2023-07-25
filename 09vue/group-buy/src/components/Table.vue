<template>
  <div class="table">
    <table>
      <tr>
        <th>ID</th>
        <th>拼团图片</th>
        <th class="name">拼团名称</th>
        <th>原价</th>
        <th>拼团价</th>
        <th>拼团人数</th>
        <th>参与人数</th>
        <th>成团数量</th>
        <th>限量</th>
        <th>限量数量</th>
        <th>结束时间</th>
        <th class="f1">拼团状态</th>
        <th class="f2">操作</th>
      </tr>

      <tr v-for="item in spellGoods" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <img width="30" :src="item.img" alt="" />
        </td>
        <td class="name">{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.spellPrice }}</td>
        <td>3</td>
        <td>20</td>
        <td>7</td>
        <td>20</td>
        <td>99999</td>
        <td>2023-07-24</td>
        <td class="f1">已结束</td>
        <td class="f2">
          <button>查看</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { spellGoods } from "../data/spellgoods";
export default {
  name: "Table",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      spellGoods,
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
      min-width: 300px;
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
    }
    .f2 {
      position: absolute;
      right: 0;
      height: 50px;
      width: 100px;
      line-height: 38px;
      // top: 30px;
      background-color: #fff;
    }
  }
}
</style>