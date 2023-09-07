<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <!-- <index-vue></index-vue> -->
      <!-- <add-service-vue></add-service-vue> -->
      <edit-service-vue></edit-service-vue>
    </el-main>
  </el-container>
</template>

<script>
import IndexVue from "@/views/index/Index.vue";
import addServiceVue from "@/views/addService/AddService.vue";
import EditServiceVue from "@/views/editService/EditService.vue";
export default {
  components: {
    IndexVue,
    addServiceVue,
    EditServiceVue,
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  padding: 0 !important;
}
</style>