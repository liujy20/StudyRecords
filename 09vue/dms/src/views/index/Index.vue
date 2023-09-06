<template>
  <div class="bg">
    <h2>早上好！Daisy</h2>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card-con">
          <img
            src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1267.png"
            alt=""
          />
          <div class="info">
            <div class="name">居民总数量</div>
            <div class="num col1">12,234</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-con">
          <img
            src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1248.png"
            alt=""
          />
          <div class="info">
            <div class="name">签约居民数量</div>
            <div class="num col2">1,234</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-con">
          <img
            src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1255.png"
            alt=""
          />
          <div class="info">
            <div class="name">待处理服务量</div>
            <div class="num col3">21,234</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card-con">
          <img
            src="	https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1261.png"
            alt=""
          />
          <div class="info">
            <div class="name">已完成服务量</div>
            <div class="num col4">1234</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="table">
          <div class="tit">数据概况</div>
          <div id="map"></div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="todo">
          <div class="tit">待办提醒</div>
          <div class="item">
            <div class="info">
              <div class="num">10</div>
              <div class="name">待审核签约申请</div>
            </div>
            <div class="tag">
              <div class="dot"></div>
            </div>
          </div>
          <div class="item">
            <div class="info">
              <div class="num">2</div>
              <div class="name">待审核服务申请</div>
            </div>
            <div class="tag">
              <div class="dot"></div>
            </div>
          </div>
          <div class="item">
            <div class="info">
              <div class="num">11</div>
              <div class="name">待完成服务</div>
            </div>
            <div class="tag">
              <div class="dot"></div>
            </div>
          </div>
          <div class="item">
            <div class="info">
              <div class="num">7</div>
              <div class="name">待回复消息</div>
            </div>
            <div class="tag">
              <div class="dot"></div>
            </div>
          </div>
          <div class="item">
            <div class="info">
              <div class="num">21</div>
              <div class="name">待处理续约</div>
            </div>
            <div class="tag">
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="resident-tags">
          <div class="tit">居民标签</div>
          <div class="item">
            <div class="top">
              <div class="name">高血压</div>
              <div class="num">200</div>
            </div>
            <el-progress :percentage="50" :show-text="false"></el-progress>
          </div>
          <div class="item">
            <div class="top">
              <div class="name">冠心病</div>
              <div class="num">200</div>
            </div>
            <el-progress :percentage="50" :show-text="false"></el-progress>
          </div>
          <div class="item">
            <div class="top">
              <div class="name">高血糖</div>
              <div class="num">200</div>
            </div>
            <el-progress :percentage="50" :show-text="false"></el-progress>
          </div>
          <div class="item">
            <div class="top">
              <div class="name">高血脂</div>
              <div class="num">200</div>
            </div>
            <el-progress :percentage="50" :show-text="false"></el-progress>
          </div>
          <div class="item">
            <div class="top">
              <div class="name">慢病护理</div>
              <div class="num">200</div>
            </div>
            <el-progress :percentage="50" :show-text="false"></el-progress>
          </div>
          <div class="item">
            <div class="top">
              <div class="name">多动症</div>
              <div class="num">200</div>
            </div>
            <el-progress :percentage="50" :show-text="false"></el-progress>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="resident-card">
          <div class="tit">
            <div class="name">居民指标异常</div>
            <div class="more">全部></div>
          </div>
          <el-row :gutter="60">
            <el-col :span="8">
              <div class="card">
                <el-card shadow="always">
                  <img
                    class="avatar"
                    src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1153.png"
                    alt=""
                  />
                  <div class="info">
                    <div class="name">王然</div>
                    <div class="age">29岁</div>
                    <img
                      class="gender"
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1152.png"
                      alt=""
                    />
                  </div>
                  <div class="problem">
                    <img
                      class="wraning"
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/error_u1155.png"
                      alt=""
                    />
                    <span>血糖过高</span>
                  </div>
                  <el-button type="primary" size="default">查看详情</el-button>
                </el-card>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card">
                <el-card shadow="always">
                  <img
                    class="avatar"
                    src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1153.png"
                    alt=""
                  />
                  <div class="info">
                    <div class="name">王然</div>
                    <div class="age">29岁</div>
                    <img
                      class="gender"
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1152.png"
                      alt=""
                    />
                  </div>
                  <div class="problem">
                    <img
                      class="wraning"
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/error_u1155.png"
                      alt=""
                    />
                    <span>血糖过高</span>
                  </div>
                  <el-button type="primary" size="default">查看详情</el-button>
                </el-card>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card">
                <el-card shadow="always">
                  <img
                    class="avatar"
                    src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1153.png"
                    alt=""
                  />
                  <div class="info">
                    <div class="name">王然</div>
                    <div class="age">29岁</div>
                    <img
                      class="gender"
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/u1152.png"
                      alt=""
                    />
                  </div>
                  <div class="problem">
                    <img
                      class="wraning"
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%B7%A5%E4%BD%9C%E5%8F%B0/error_u1155.png"
                      alt=""
                    />
                    <span>血糖过高</span>
                  </div>
                  <el-button type="primary" size="default">查看详情</el-button>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="list">
          <div class="tit">本周签约概况</div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div class="foot">
Copyright © DaisyAxure All Rights Reserved
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data(){
    return{
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("map"));
    let option = {
      legend: {
        data: ["居民数量", "签约量", "服务量"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "居民数量",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "签约量",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "服务量",
          type: "line",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  background-color: #f2f7fb;
  overflow: auto;
  padding: 0 30px;
  h2 {
    color: #333;
    font-size: 18px;
    font-weight: normal;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .card-con {
    border-radius: 10px;
    background-color: #fff;
    padding: 30px;
    display: flex;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      .name {
        font-size: 13px;
        color: #999;
      }
      .num {
        font-size: 30px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .col1 {
        color: #2984f8;
      }
      .col2 {
        color: #28d094;
      }
      .col3 {
        color: #ffc71c;
      }
      .col4 {
        color: #ff6262;
      }
    }
  }
  .table {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    .tit {
      color: #333;
      font-size: 16px;
      margin: 20px 0;
    }
    #map {
      width: 100%;
      height: 440px;
    }
  }

  .todo {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    .tit {
      color: #333;
      font-size: 16px;
      margin: 20px 0;
    }
    .item {
      border-top: 1px solid #ccc;
      padding: 20px 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        margin: 10px 0;
        font-size: 12px;
        color: #999;
      }
      .tag {
        .dot {
          background-color: red;
          border-radius: 50%;
          width: 5px;
          height: 5px;
        }
      }
    }
  }

  .resident-tags {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    .tit {
      color: #333;
      font-size: 16px;
      margin: 20px 0;
    }
    .item {
      padding: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 10px;
        .name {
          color: #999;
        }
      }
    }
  }

  .resident-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 20px 30px;
    .tit {
      color: #333;
      font-size: 16px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      .more {
        color: #999;
      }
    }
    .card {
      margin-top: 20px;
      text-align: center;
      .el-card:hover {
        background-color: #f2f7fb !important;
      }
      .info {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        .name {
          font-size: 18px;
        }
        .age {
          font-size: 12px;
          color: #999;
          margin: 0 8px;
        }
        .gender {
          width: 9px;
          height: 13px;
        }
      }
      .problem {
        margin: 10px 0;
        span {
          color: #ff6262;
          font-size: 13px;
        }
      }
      button {
        margin-top: 20px;
      }
    }
  }
  .list {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 20px 30px;
    .tit {
      color: #333;
      font-size: 16px;
      margin: 20px 0;
    }
  }
  .foot{
    text-align: center;
    margin: 30px;
    font-size: 14px;
    color: #999;
  }
}
</style>