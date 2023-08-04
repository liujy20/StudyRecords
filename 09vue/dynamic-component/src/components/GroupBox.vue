<template>
    <div id="partin">
      <div class="people">
        <img src="../assets/用户分析 (1).png" alt="" />
        <div class="info">
          <p>参与人数(人)</p>
          107
        </div>
      </div>
      <div class="group">
        <img src="../assets/用户分析.png" alt="" />
        <div class="info">
          <p>成团数量(个)</p>
          14
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style lang='scss'>
  #partin {
    background-color: #f5f5f5;
    height: 25vh;
    display: flex;
    align-items: center;
    .people {
      width: 220px;
      height: 70%;
      background-color: #fff;
      margin-left: 25px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50px;
      }
      .info {
        margin-left: 10px;
        font-size: 28px;
        color: #000;
        font-weight: bold;
        p {
          padding: 0;
          margin: 0;
          font-size: 12px;
          color: #333;
          font-weight: normal;
        }
      }
    }
    .group {
      width: 220px;
      height: 70%;
      background-color: #fff;
      margin-left: 20px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50px;
      }
      .info {
        margin-left: 10px;
        font-size: 28px;
        color: #000;
        font-weight: bold;
        p {
          padding: 0;
          margin: 0;
          font-size: 12px;
          color: #333;
          font-weight: normal;
        }
      }
    }
  }
  </style>