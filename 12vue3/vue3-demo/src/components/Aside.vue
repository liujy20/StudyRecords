<template>
  <el-aside width="250px" style="background-color:#393e46">
    <el-menu active-text-color="#ffd04b" background-color="#393e46" class="el-menu-vertical-demo" default-active="2"
      text-color="#fff" width="100%" @open="handleOpen" @close="handleClose" :router="true">
      <el-menu-item class="tit">
        <template #title>
          <el-image class="logo" src="http://xawn.x3322.net:8002/distremote/static/img/logo.png" fit="fill"></el-image>
          <span>赤兔养车</span>
        </template>
      </el-menu-item>
      <template v-for="item in myMenu" :key="item.path">
        <el-menu-item v-if="!item.children" :index="item.path">
          <template #title>
            <el-icon>
              <House />
            </el-icon>
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>

        <el-sub-menu v-else :index="item.path">
          <template #title>
            <el-icon>
              <IconMenu />
            </el-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="item2 in item.children" :index="item2.path">{{item2.name}}</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang='ts' setup>
import {
  House,
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import {IMenu} from '@/interfaces/menu'
// import {useRouter} from 'vue-router'
// const router=useRouter()
const myMenu = ref<IMenu[]>([])
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
//   router.push(key)
// }

onMounted(() => {
  const menus = JSON.parse(localStorage.getItem("menu") || "[]")
  console.log(menus);
  myMenu.value = menus
})
</script>

<style lang='scss' scoped>
.tit {
  .logo {
    width: 30px;
    height: 16px;
  }

  span {
    font-size: 20px;
    margin-left: 12px;
    font-weight: bold;
  }
}
</style>