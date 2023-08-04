<template>
    <div id="pagin">
      <div class="null"></div>
      <div class="limit">
        <div class="total">共<span>0</span>条</div>
        <select name="" id="" class="sel">
          <option value="">20条/页</option>
        </select>
        <div class="changePage">
          <span :class=" curPage ==index ? 'active':''"  @click="switchPage(index)" v-for="(item,index) in 10" :key="item">{{ item }}</span>
          <!-- <span :class=" curPage ==1 ? 'active':''"  v-on:click="switchPage(1)">1</span> -->
         
        </div>
        <div class="toPage">前往<input type="text" value="1" />页</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return {
        curPage:0
      }
    },
    methods:{
      switchPage(num){
        this.curPage = num;
      }
    }
  };
  </script>
  
  <style lang='scss'>
  #pagin {
    margin-top: 20px;
    height: 70px;
    display: flex;
    font-size: 12px;
    margin-right: 10px;
    .null {
      flex-grow: 1;
    }
    .limit {
      display: flex;
      align-items: center;
      .total {
        margin-right: 20px;
      }
      .sel {
        width: 80px;
        height: 20px;
      }
      .changePage {
        margin-left: 20px;
        span{
            display: inline-block;
            padding:5px 10px;
            margin:0 5px;
            line-height: 16px;
            border: 1px solid #ccc;
        }
        .active{
            color: white;
            background-color: #3e8bf0;
        }
      }
      .toPage {
        margin-left: 20px;
        input {
          width: 20px;
          height: 15px;
          margin: 0 5px;
        }
      }
    }
  }
  </style>