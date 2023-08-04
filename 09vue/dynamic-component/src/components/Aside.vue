<template>
  <div id="nav">
    <div id="logo">
      <img class="logo-img" src="../assets/woniu.png" alt="" />
    </div>
    <ul id="nav-list">
      <li class="nav-item" >
        <div class="item-content">
          <img src="../assets/cate.png" alt="" />
          <span class="item-title">运营</span>
          <img class="arrow" src="../assets/arrow.png" alt="" />
        </div>
        <ul class="nav-children">
          <li>控制台</li>
          <li>商品统计</li>
          <li>用户统计</li>
          <li>交易统计</li>
        </ul>
      </li>
      <li class="nav-item" >
        <div class="item-content">
          <img src="../assets/line.png" alt="" />
          <span class="item-title">拼团管理</span>
          <img class="arrow" src="../assets/arrow.png" alt="" />
        </div>
        <ul class="nav-children">
          <li>拼团商品</li>
          <li>拼团列表</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
#nav {
  width: 200px;
  background-color: rgb(70, 70, 70);
  color: white;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  #logo {
    text-align: center;
    padding-top: 20px;
    .logo-img {
      height: 40px;
    }
  }
  #nav-list {
    .nav-item {
        &:hover .nav-children{
            display: block;
        }
        &:hover .item-content .arrow{
            transform: rotate(0deg);
        }
      .item-content {
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        height: 50px;
        &:hover {
          background-color: rgb(63, 62, 61);
          cursor: pointer;
        }
        img {
          height: 20px;
        }
        .item-title {
          flex-grow: 1;
          text-align: left;
          margin-left: 10px;
        }
        .arrow {
          transform: rotate(180deg);
        }
      
      }
      .nav-children {
        display: none;
        li{
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            &:hover{
                background-color: rgb(63, 62, 61);
                cursor: pointer;
            }
        }
      }
    }
  }
}
</style>
