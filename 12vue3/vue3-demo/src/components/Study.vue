<template>
  <div>
    <el-input v-model="input"></el-input>
    <el-table :data="renderList" style="width: 100%">
      <el-table-column prop="id" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="age" label="Address" />
    </el-table>
    <el-tag type="success" effect="dark">{{ length }}</el-tag>
    
  </div>
</template>

<script lang='ts' setup>
import { IUsers } from '@/interfaces/user'
const input = ref<string>('')
const list = reactive<IUsers[]>([
  { id: 1, name: 'xiangwang', age: 20 },
  { id: 2, name: 'xiangli', age: 21 },
  { id: 3, name: 'xiangzhang', age: 23 }
])

watch(input, (newval) => {
  console.log(newval);
})

const length = computed(() => {
  const len = renderList.value.length
  return len
})
const renderList = computed(() => {
  const temp = list.filter(item => {
    if (item.id === Number(input.value) || !input.value) {
      return true
    }
  })
  return temp
})

</script>

<style lang='scss' scoped></style>