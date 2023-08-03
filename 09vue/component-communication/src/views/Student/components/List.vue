<template>
  <div class="tab" style="display: block">
    <input type="text" id="search" v-model="temp"/>
    <input type="button" value="查询" id="search-btn" @click="search=temp"/>
    <table>
      <!-- 表格的头部 -->
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
      </thead>
      <!-- 表格的内容 -->
      <tbody>
        <!-- 动态：示例tr -->
        <tr v-for="item in searchList" :key="item.snum">
          <td>{{ item.snum }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.sex }}</td>
          <td>
            <button data-id="" class="updateBtn" @click="editInfo(item)">修改</button
            ><button class="delBtn" data-id="" @click="$emit('del',item)">删除</button>
          </td>
        </tr>
        <!-- 动态生成 -->
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '../../../util/bus'
export default {
  props:['students'],
  data(){
    return {
      search:'',
      temp:''
    }
  },
  methods:{
    editInfo(value){
      bus.$emit('info',value)
    }
  },
  computed:{
    searchList(){ 
      return this.students.filter(item=>{
        return Object.values(item).some(val=>{
          return String(val).includes(this.search)
        })
      })
    }
  }
};
</script>

<style>
</style>