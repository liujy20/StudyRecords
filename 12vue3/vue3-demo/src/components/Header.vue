<template>
  <div class="header">
    <el-icon>
      <Fold />
    </el-icon>
    <el-dropdown style="outline: none;" @command="handleCommand">
      <span class="user">
        <img src="http://xawn.x3322.net:8002/distremote/static/avatar/default.jpg" />
        <span class="name">bobo</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>密码修改</el-dropdown-item>
          <el-dropdown-item divided>系统定制</el-dropdown-item>
          <el-dropdown-item divided command="out">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang='ts' setup>
import { Fold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleCommand = (command: string | number | object) => {
  if (command === "out") {
    router.replace('/login')
    localStorage.clear()
  }
}
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

    img {
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

  :deep(:focus-visible) {
    outline: none;
  }
}
</style>