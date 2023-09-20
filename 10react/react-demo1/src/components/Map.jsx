import * as echarts from "echarts"; //引入全部图表
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosUtil";
let myChart, option;

export default function Home() {
  const [data, setData] = useState([]);
  // echarts地图
  useEffect(() => {
    myChart = echarts.init(document.getElementById("main"));
    myChart.showLoading();
    myChart.hideLoading();
    echarts.registerMap("四川", data); //这边引入区域数据文件
    myChart.setOption(
      (option = {
        // backgroundColor: '#042636',
        tooltip: {
          backgroundColor: "rgba(21, 24, 45, 0.9)", // 提示框浮层的背景颜色。
          textStyle: {
            // 提示框浮层的文本样式。
            color: "#fff",
            fontSize: 14,
          },
        },
        geo: {
          //底部背景地图的配置
          tooltip: {
            show: true,
          },
          map: "四川",
          aspectScale: 0.95, //长宽比
          zoom: 1.1,
          roam: false,
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        },
        series: [
          {
            //上面覆盖的地图配置
            type: "map",
            map: "四川",
            aspectScale: 0.95, //长宽比
            zoom: 1.1,
            roam: false,
            label: {
              show: true,
              // color: "#FFFFFF",
              fontSize: 12,
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              emphasis: {
                areaColor: '#1677ff', //鼠标选择区域颜色
                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
                // shadowBlur: 20,
                // borderWidth: 0,
                color:'#ffffff',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
    
          },
        ],
      })
    );
    myChart.setOption(option);
    
  }, [data]);
  useEffect(() => {
    axios
      .get("https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json")
      .then((res) => {
        console.log(res.data.features);
        setData(res.data);
      });
  }, []);
  //echarts地图设置点击事件  点击时高亮关闭换成自定义颜色


  return <div style={{ height: "950px", width: "80%" }} id="main"></div>;
}
