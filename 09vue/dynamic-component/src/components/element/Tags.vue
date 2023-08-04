<template>
  <div>
    <el-tag
  v-for="tag in tags"
  :key="tag.name"
  closable
  type="info"
  @click="$emit('changeComponent',tag)"
  >
  {{tag.name}}
</el-tag>
  </div>
</template>

<script>
export default {
  props:['tags'],
    data() {
      return {
        
      };
    }
  }
</script>

<style>
.el-tag{
    margin-right: 10px;
}
</style>