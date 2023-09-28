<template>
  <el-container style="height: 100vh;">
    <Aside></Aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <div class="bg">
          <div class="main">
            <router-view></router-view>
          </div>
          <div class="footer">
            Copyright &copy; 2023
            <el-link type="primary" :underline="false">admin</el-link>

          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
.el-main {
  padding: 0;
}

.bg {
  background-color: #eef0f3;
  height: 100%;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;

  .main {
    background-color: #fff;
    padding: 16px 32px;


  }

  .footer {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    .el-link {
      margin-left: 5px;
    }
  }
}
</style>