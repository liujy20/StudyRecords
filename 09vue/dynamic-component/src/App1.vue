<!-- 动态组件 -->
<template>
  <el-container>
    <el-aside width="200px">
      <Nav></Nav>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <Tags :tags="components" @changeComponent="changeComponent"></Tags>
        <KeepAlive include="User"><component :is="component"></component></KeepAlive>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import NavVue from './components/element/Nav.vue'
import Header from './components/element/Header.vue'
import Tags from "./components/element/Tags.vue"
import spellGroup from "./views/spellGoodsElement.vue"
import SpellGood from "./views/SpellGoodsAll.vue"
import User from "./views/UserControl/UserControl.vue"


export default {
  components: {
    Nav: NavVue,
    Header,
    Tags,
    User,
    spellGroup,
    SpellGood,

  },
  data() {
    return {
      component:'SpellGood',
      components: [
        { name: '拼团列表', componentName: "SpellGood" },
        { name: '开团列表', componentName: "spellGroup" },
        { name: '用户列表', componentName: "User" },
      ]
    }
  },
  methods: {
    changeComponent(value) {
      this.component=value.componentName
    }
  }
}
</script>

<style >
body {
  margin: 0;
}

ul {
  list-style: none;
}

.el-header,
.el-footer {
  /* background-color: #B3C0D1; */
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  height: 100vh;
}


.el-main {
  height: calc(100vh - 120px);
}
</style>