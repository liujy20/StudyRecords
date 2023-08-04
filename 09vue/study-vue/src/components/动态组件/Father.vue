<template>
  <div>
    <el-button v-for="item in components" :key="item.title" :data="item.title" @click="component=item">{{item.title}}</el-button>
    <component :is="component.component" :data="component"></component>
  </div>
</template>

<script>
import Tag1Vue from './Tag1.vue'
import Tag2Vue from './Tag2.vue'
export default {

  data(){
    return{
      component:{
        title:'标签1',
        component:Tag1Vue
      },
      components:[
        {
          title:'标签1',
          component:Tag1Vue
        },
        {
          title:'标签2',
          component:Tag2Vue
        },

      ]
    }
  }
}
</script>

<style>

</style>