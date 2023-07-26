<template>
  <div class="aside">
    <div class="logo">
      <img :src="logo" alt="" />
    </div>
    <div class="type">
      <div class="tit">
        <img :src="cate" alt="" />
        <span>运营</span>
        <img :src="arrow" alt="" />
      </div>
      <ul>
        <li>商品统计</li>
        <li>用户统计</li>
      </ul>
    </div>
    <div class="type">
      <div class="tit">
        <img :src="line" alt="" />
        <span>商品</span>
        <img :src="arrow" alt="" />
      </div>
      <ul>
        <li>秒杀管理</li>
        <li>砍价管理</li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from "../assets/images/woniu.png";
import cate from "../assets/images/cate.png";
import line from "../assets/images/line.png";
import arrow from "../assets/images/arrow.png";
export default {
  data() {
    return {
      logo,
      cate,
      line,
      arrow,
    };
  },
};
</script>

<style lang='scss'>
.aside {
  height: 100%;
  width: 200px;
  background-color: #304156;
  color: #fff;
  .logo {
    height: 65px;
    img {
      margin-top: 10px;
      width: 160px;
    }
  }
  .type {
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    .tit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 65px;
      line-height: 65px;
      span {
        flex-grow: 1;
      }
      img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
        &:last-child {
          transition: all 0.3s;
          width: 15px;
          height: 15px;
        }
      }
      &:hover {
        background-color: #263445;
      }
    }
    ul {
      height: 0;
      li {
        line-height: 65px;
        padding: 0 30px;
        height: 65px;
        &:hover {
          background-color: #263445;
        }
      }
    }
    &:hover {
      img:last-child {
        transform: rotate(180deg);
      }
      ul {
        height: auto;
      }
    }
  }
}
</style>