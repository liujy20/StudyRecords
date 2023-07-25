<template>
  <div class="aside">
    <div class="logo">
      <img src="" alt="" />
    </div>
    <div class="type">
      <div class="tit">运营</div>
      <ul>
        <li>商品统计</li>
        <li>用户统计</li>
      </ul>
    </div>
    <div class="type">
      <div class="tit">商品</div>
      <ul>
        <li>秒杀管理</li>
        <li>砍价管理</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.aside {
  height: 100%;
  width: 10%;
  background-color: #304156;
  color: #fff;
  .logo {
    height: 50px;
  }
  .type {
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    .tit {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background-color: #263445;
      }
    }
    ul {
      height: 0;
      li {
        line-height: 50px;
        &:hover {
          background-color: #263445;
        }
      }
    }
    &:hover {
      ul {
        height: inherit;
      }
      li {
        padding: 0 30px;
        height: 50px;
      }
    }
  }
}
</style>