<template>
  <el-main id="dashboard">
    <div class="module">
      <div v-for="item in 4" :key="item">
        <div class="title">
          <span>销售额</span>
          <span class="today">今日</span>
        </div>
        <p class="data">100</p>
        <hr />
        <div class="info">
          <span>昨日数据</span>
          <p><span>100.00</span>元</p>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="line">
        <div class="title">快捷入口</div>
        <div class="list">
          <div v-for="item in 7" :key="item">
            <img
              class="blue"
              src=""
              alt=""
              srcset=""
            />
            <span>用户管理</span>
          </div>
        </div>
      </div>
      <div class="line run">
        <div class="title">经营数据</div>
        <div class="list">
          <div v-for="item in 7" :key="item">
            <p class="data">121</p>
            <span>用户管理</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表 -->
    <div class="module">
      <div class="line box1">
        <div class="title">用户概况</div>
        <div class="search">
          <el-radio-group v-model="radio1">
            <el-radio-button label="昨天"></el-radio-button>
            <el-radio-button label="最近7天"></el-radio-button>
            <el-radio-button label="最近30天"></el-radio-button>
          </el-radio-group>
          <!-- 日期 -->
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <!-- 搜索 -->
          <el-button
            type="primary"
            size="default"
            icon="el-icon-search"
          ></el-button>
        </div>

        <div id="Chart1"></div>
      </div>
      <div class="line box2">
        <div class="title">用户渠道</div>
        <div id="Chart2"></div>
      </div>
    </div>
  </el-main>
</template>

<script>
import * as echarts from "echarts";
import china from "@/data/china.js";
//将地理数据注入到全局的china属性
echarts.registerMap("china", china);
export default {
  data() {
    return {
      value1: [],
      radio1: "最近七天",
      users: [],
      roles: [],
    };
  },
  async created() {
    let userres = await this.$http.userHttp.getUser();
    let roleres = await this.$http.roleHttp.getSystemUser();
    this.users = userres.data.data;
    this.roles = roleres.data.data;
    // console.log(this.users,this.roles);
    this.Chart1Init();
  },
  mounted() {
    this.ChartInit2();
  },
  computed: {
    roleChartData() {
      /**
       *先遍历角色数组，用于填充arr表示有多少个角色，初始每个角色数量为0 ，再遍历用户数据，找到其角色数组，进行遍历，将arr中对应角色用户数量+1
       */
      let arr = [];
      // console.log('用户数组',this.users);
      //1.有多少个角色，填充到arr中
      arr = this.roles.map((r) => {
        return {
          name: r.roleName,
          value: 0, //当前用户数量为0
        };
      });
      //2.遍历用户数组，依次对比，添加对应角色用户数量
      this.users.forEach((user) => {
        //遍历该用户的角色数组
        user.roles.forEach((role) => {
          //找到arr中角色名字一样的对象，其value++
          arr.find((roleuser) => roleuser.name == role.roleName).value++;
        });
      });
      // console.log('角色用户数组',arr);
      return arr;
    },
  },
  methods: {
    Chart1Init() {
      //1. 初始化
      let c1 = echarts.init(document.getElementById("Chart1"));
      //2 设置option
      let option = {
        title: {
          text: "角色数量分布图",
          // subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "用户数量",
            type: "pie",
            radius: "50%",
            data: this.roleChartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      //3. setOption
      c1.setOption(option);
    },
    ChartInit2() {
      let c2 = echarts.init(document.getElementById("Chart2"));
      //图表数据
      var chinaGeoCoordMap = {
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };
      var chinaDatas = [
        [
          {
            name: "北京市",
            value: 0,
          },
          {
            name: "黑龙江",
            value: 0,
          },
          { name: "上海市" },
        ],
        [
          {
            name: "内蒙古",
            value: 0,
          },
        ],
        [
          {
            name: "吉林",
            value: 0,
          },
        ],
        [
          {
            name: "辽宁",
            value: 0,
          },
        ],
        [
          {
            name: "河北",
            value: 0,
          },
        ],
        [
          {
            name: "天津",
            value: 0,
          },
        ],
        [
          {
            name: "山西",
            value: 0,
          },
        ],
        [
          {
            name: "陕西",
            value: 0,
          },
        ],
        [
          {
            name: "甘肃",
            value: 0,
          },
        ],
        [
          {
            name: "宁夏",
            value: 0,
          },
        ],
        [
          {
            name: "青海",
            value: 0,
          },
        ],
        [
          {
            name: "四川",
            value: 0,
          },
        ],
        [
          {
            name: "重庆",
            value: 0,
          },
        ],
        [
          {
            name: "山东",
            value: 0,
          },
        ],
        [
          {
            name: "河南",
            value: 0,
          },
        ],
        [
          {
            name: "江苏",
            value: 0,
          },
        ],
        [
          {
            name: "安徽",
            value: 0,
          },
        ],
        [
          {
            name: "湖北",
            value: 0,
          },
        ],
        [
          {
            name: "浙江",
            value: 0,
          },
        ],
        [
          {
            name: "福建",
            value: 0,
          },
        ],
        [
          {
            name: "江西",
            value: 0,
          },
        ],
        [
          {
            name: "湖南",
            value: 0,
          },
        ],
        [
          {
            name: "贵州",
            value: 0,
          },
        ],
        [
          {
            name: "广西",
            value: 0,
          },
        ],
        [
          {
            name: "海南",
            value: 0,
          },
        ],
        [
          {
            name: "上海",
            value: 0,
          },
        ],
      ];

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [
            [121.4648, 31.2891],
            [110.3467, 41.4899],
            [110.3467, 41.4899],
            [110.3467, 41.4899],
            [110.3467, 41.4899],
            [110.3467, 41.4899],
            [110.3467, 41.4899],
            [110.3467, 41.4899],
          ]; //被攻击点
          if (fromCoord && toCoord[i]) {
            res.push([
              {
                coord: toCoord[i],
              },
              {
                coord: fromCoord,
                value: dataItem[0].value,
                // visualMap: false
              },
            ]);
          }
        }
        return res;
      };

      var series = [];
      [["四川", chinaDatas]].forEach(function (item, i) {
        console.log(item);
        series.push(
          {
            type: "lines",
            zlevel: 2,

            effect: {
              show: true,
              period: 3, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5, //图标大小
            },
            lineStyle: {
              normal: {
                color: "red",
                width: 1, //尾迹线条宽度
                opacity: 0.7, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            data: convertData(item[1]),
          },

          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4, //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function (params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 13,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: "circle",
            symbolSize: function (val) {
              return 5 + val[2] * 5; //圆环大小
            },
            itemStyle: {
              normal: {
                show: true,
                color: "#f00",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[0].name,
                value: chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value,
                ]),
                // visualMap: false
              };
            }),
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                show: false, //定位点名字
                position: "right",
                // offset:[5, 0],
                color: "#0f0",
                formatter: "{b}",
                textStyle: {
                  color: "#0f0",
                },
              },
              emphasis: {
                // show: false,   //定位标记
                color: "#f60",
              },
            },
            symbol: "pin", //定位图标样式
            symbolSize: 50,
            data: [
              {
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });

      let option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#04284e",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>数据：" +
              value;
            return res;
          },
        },
        backgroundColor: "#fff",
        visualMap: {
          //图例值控制
          min: 0,
          max: 1,
          calculable: true,
          show: true,
          color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
          textStyle: {
            color: "#fff",
          },
        },
        geo: [
          {
            map: "china",
            show: true,
            label: {
              emphasis: {
                show: false,
              },
            },
            roam: true, //是否允许缩放
            layoutCenter: ["49%", "50%"], //地图位置
            layoutSize: "120%",
            itemStyle: {
              normal: {
                show: "true",
                color: "#04284e", //地图背景色
                borderColor: "#5bc1c9", //省市边界线
              },
              emphasis: {
                show: "true",
                color: "rgba(37, 43, 61, .5)", //悬浮背景
              },
            },
            // itemStyle: {
            //     // 区域样式
            //     areaColor: {
            //       type: "radial",
            //       x: 0.5,
            //       y: 0.5,
            //       r: 0.8,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: "rgba(37, 43, 61, .5)", // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
            //         },
            //       ],
            //       globalCoord: false, // 缺省为 false
            //     },
            //     shadowColor: "#5bc1c9", //地图区域的阴影颜色。
            //     shadowOffsetX: 0,
            //     shadowOffsetY: 10,
            //   },
          },
        ],
        series: series,
      };
      //setopion
      c2.setOption(option);
    },
  },
};
</script>

<style lang="scss">
#dashboard {
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  height: 1px;
  overflow: auto;
  .module {
    padding: 15px;
    display: flex;
    flex-wrap: nowrap;
    font-size: 14px;
    > div {
      flex-grow: 1;
      margin-right: 15px;
      background-color: #fff;
      padding: 15px;
      // &:last-child{
      //   margin-right: 0;
      // }
      .data {
        font-size: 30px;
        margin: 8px 0;
      }
      .title,
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .today {
          display: inline-block;
          padding: 3px 10px;
          border: 1px solid #d1e9ff;
          background-color: #e8f4ff;
          border-radius: 5px;
        }
      }
    }
    .line .title {
      border-left: 2px solid #1890ff;
      padding-left: 8px;
    }
    .line.box1 {
      width: 70% !important;
      flex-grow: 0 !important;
    }
    .line.box2 {
      flex-grow: 1 !important;
    }
    .box1 .title,
    .box2 title {
      margin-bottom: 15px;
    }
    .line {
      flex-grow: 1;
      .list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
          margin-right: 30px;
        }
      }
    }
    .run {
      .data {
        font-size: 30px;
      }
    }
  }
  .blue {
    background-color: rgb(49, 88, 218);
    widows: 20px;
    padding: 10px;
  }
}
#Chart1,
#Chart2 {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  height: 400px;
  margin-top: 15px;
}
</style>
