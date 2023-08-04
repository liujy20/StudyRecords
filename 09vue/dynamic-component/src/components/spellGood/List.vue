<template>
  <!-- 表格 -->
  <el-table :data="products | filterProductsMore(search)" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="img" label="头像" width="120">
        <template v-slot="scope">
          <img width="30" :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="开团团长" width="120">
      </el-table-column>
      <el-table-column prop="product.name" label="开团商品" width="320">
      </el-table-column>
      <el-table-column prop="product.price" label="商品价格" width="50">
      </el-table-column>
      <el-table-column prop="spellPeople" label="几人团" width="100">
      </el-table-column>
      <el-table-column prop="joinPeople" label="几人参加" width="120">
      </el-table-column>
      <el-table-column prop="beginTime" label="开始时间" width="120">
      </el-table-column>
      <el-table-column prop="status" label="拼团状态" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? "已结束" : "进行中" }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="delGood(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="$emit('toEdit',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:['products','search'],
    filters:{
         //搜索：多条件联动
    filterProductsMore(goods, data) {
      let result = goods;
      //筛选第一个条件：几人团
      result = result.filter(g => g.spellPeople == data.spellPeople)
      //筛选第二个条件；状态
      if (data.searchStatus !== "") {
        //已结束
        result = result.filter(g => g.status === data.searchStatus)
      }
      //筛选第三个条件：价格
      result = result.filter(g => g.product.price >= data.minPrice
        && g.product.price <= data.maxPrice)
      return result;
    }
    }
}
</script>

<style>

</style>