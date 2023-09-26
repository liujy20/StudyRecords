<template>
  <div>header</div>
  <el-button type="primary" size="default" @click="fatchDAta">发送请求</el-button>
</template>

<script lang='ts' setup>
import { findAllGood } from '@/apis/goodApi'

const fatchDAta = async () => {
  let res = await findAllGood()
  console.log(res);
}
</script>

<style lang='scss' scoped></style>