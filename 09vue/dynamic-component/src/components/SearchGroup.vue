<template>
    <div id="date">
      <div class="date">
        选择时间：
        <div class="cTime">
          <span class="cspan">全部</span>
          <span>今天</span>
          <span>昨天</span>
          <span>最近7天</span>
          <span>最近30天</span>
          <span>本月</span>
          <span>本年</span>
        </div>
        <input type="date" />
      </div>
      <div class="inp">
        拼团状态：
        <select name="" id="">
          <option value="" selected>全部</option>
          <option value="">进行中</option>
          <option value="">已结束</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style lang='scss'>
  #date {
    height: 130px;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    .date {
      height: 30%;
      margin-left: 35px;
      font-size: 14px;
      color: #333;
      font-weight: bold;
      margin-top: 20px;
      display: flex;
      align-items: center;
      .cTime {
        font-size: 12px;
        font-weight: normal;
        color: #333;
        border: 1px solid #ddd;
        height: 25px;
        border-radius: 2px;
        display: flex;
        span {
          display: block;
          height: 25px;
          line-height: 25px;
          padding: 0 15px;
          border-right: #ddd 1px solid;
          &:last-child {
            border-right: none;
          }
        }
        .cspan {
          color: #fff;
          background-color: #1890ff;
        }
      }
      input {
        margin-left: 20px;
        width: 200px;
        height: 25px;
      }
    }
    .inp {
      margin-top: 10px;
      margin-left: 35px;
      font-size: 14px;
      color: #333;
      font-weight: bold;
      select {
        width: 200px;
        height: 25px;
      }
    }
  }
  </style>