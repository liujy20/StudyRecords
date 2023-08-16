<template>
  <el-main class="bg">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="card1">
          <div class="tit">
            <div class="name">销售额</div>
            <el-tag>今日</el-tag>
          </div>
          <div class="num">0.01</div>
          <el-divider></el-divider>
          <div class="info">
            <div class="name">昨日数据</div>
            <div class="count">0.00 元</div>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="card1">
          <div class="tit">
            <div class="name">销售额</div>
            <el-tag>今日</el-tag>
          </div>
          <div class="num">0.01</div>
          <el-divider></el-divider>
          <div class="info">
            <div class="name">昨日数据</div>
            <div class="count">0.00 元</div>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="card1">
          <div class="tit">
            <div class="name">销售额</div>
            <el-tag>今日</el-tag>
          </div>
          <div class="num">0.01</div>
          <el-divider></el-divider>
          <div class="info">
            <div class="name">昨日数据</div>
            <div class="count">0.00 元</div>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="card1">
          <div class="tit">
            <div class="name">销售额</div>
            <el-tag>今日</el-tag>
          </div>
          <div class="num">0.01</div>
          <el-divider></el-divider>
          <div class="info">
            <div class="name">昨日数据</div>
            <div class="count">0.00 元</div>
          </div>
        </div></el-col
      >
    </el-row>
    <!-- <div class="card1">
        <div class="tit">
          <div class="name">销售额</div>
          <el-tag>今日</el-tag>
        </div>
        <div class="num">0.01</div>
        <el-divider></el-divider>
        <div class="info">
          <div class="name">昨日数据</div>
          <div class="count">0.00 元</div>
        </div>
      </div>
      <div class="card1">
        <div class="tit">
          <div class="name">销售额</div>
          <el-tag>今日</el-tag>
        </div>
        <div class="num">0.01</div>
        <el-divider></el-divider>
        <div class="info">
          <div class="name">昨日数据</div>
          <div class="count">0.00 元</div>
        </div>
      </div>
      <div class="card1">
        <div class="tit">
          <div class="name">销售额</div>
          <el-tag>今日</el-tag>
        </div>
        <div class="num">0.01</div>
        <el-divider></el-divider>
        <div class="info">
          <div class="name">昨日数据</div>
          <div class="count">0.00 元</div>
        </div>
      </div>
      <div class="card1">
        <div class="tit">
          <div class="name">销售额</div>
          <el-tag>今日</el-tag>
        </div>
        <div class="num">0.01</div>
        <el-divider></el-divider>
        <div class="info">
          <div class="name">昨日数据</div>
          <div class="count">0.00 元</div>
        </div>
      </div> -->

    <el-row :gutter="20">
      <el-col :span="12"
        ><div class="card2">
          <div class="tit">快捷入口</div>
          <div class="content">
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
            <div class="item">
              <img :src="subNav" alt="" />
              <p>用户管理</p>
            </div>
          </div>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="card2">
          <div class="tit">快捷入口</div>
          <div class="content">
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
            <div class="item">
              <div class="num">121</div>
              <div class="info">待发货订单</div>
            </div>
          </div>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="card3">
          <div class="tit">
            <span>快捷入口</span>
            <div>
              <el-radio-group v-model="time" size="small">
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="最近七天"></el-radio-button>
                <el-radio-button label="最近三十天"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="block">
              <el-date-picker
                v-model="timeValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
              >
              </el-date-picker>
            </div>
            <el-button size="small" type="primary">搜索</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card4">
          <div class="tit">快捷入口</div>
          <div id="myChart1"></div>
        </div>
      </el-col>
    </el-row>
    <div class="footer">
      <span>官网</span>
      <span>社区</span>
      <span>文档</span>
    </div>
  </el-main>
</template>

<script>
import subNav from "@/assets/subNav.jpg";
import * as echarts from "echarts";
export default {
  data() {
    return {
      subNav,
      time: "昨天",
      timeValue: "",
    };
  },
  methods: {
    getChart1() {
      const mychart = echarts.init(document.getElementById("myChart1"));
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          right: "right",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "H5" },
              { value: 735, name: "APP" },
              { value: 580, name: "小程序" },
              { value: 484, name: "公众号" },
            ],
          },
        ],
      };
      mychart.setOption(option);
    },
  },
  mounted() {
    this.getChart1();
  },
};
</script>

<style lang="scss">
.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 0 20px !important;
  height: 1px !important;
  overflow: auto !important;
  .el-row {
    margin-bottom: 20px;
    .card1 {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-sizing: border-box;
      .tit {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .num {
        margin: 15px 0;
        font-size: 30px;
        font-weight: 600;
        color: #333;
        text-align: left;
      }
      .info {
        display: flex;
        justify-content: space-between;
      }
    }
    .card2 {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-sizing: border-box;
      height: 310px;
      .tit {
        padding-left: 10px;
        border-left: 3px solid #1890ff;
        text-align: left;
        font-weight: 600;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        .item {
          margin-top: 30px;
          width: 115px;
          img {
            width: 58px;
          }
          p {
            font-size: 14px;
            margin: 12px 0 0;
          }
          .num {
            font-size: 28px;
            margin: 15px 0;
            font-weight: 600;
          }
          .info {
            font-size: 14px;
            margin-top: 15px;
          }
        }
      }
    }
    .card3 {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-sizing: border-box;
      height: 430px;
      .tit {
        padding-left: 10px;
        border-left: 3px solid #1890ff;
        text-align: left;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          flex-grow: 1;
        }
      }
    }
    .card4 {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-sizing: border-box;
      .tit {
        padding-left: 10px;
        border-left: 3px solid #1890ff;
        text-align: left;
        font-weight: 600;
      }
      #myChart1{
        width: 100%;
        height: 370px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 40px;
    font-size: 14px;
    span {
      padding: 0 10px;
    }
  }
}
</style>