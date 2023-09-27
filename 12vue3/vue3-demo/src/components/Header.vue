<template>
  <div class="header">
    <el-icon>
      <Fold />
    </el-icon>
    <el-dropdown style="outline: none;">
      <span class="user">
        <img src="http://xawn.x3322.net:8002/distremote/static/avatar/default.jpg"/>
        <span class="name">bobo</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts' setup>
import { Fold } from '@element-plus/icons-vue'
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  line-height: 1;
  font-size: 24px;

  .user {
    display: flex;
    align-items: center;
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .name {
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}</style>