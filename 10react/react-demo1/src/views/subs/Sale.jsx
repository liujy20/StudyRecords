import React, { useEffect, useState } from "react";
import MyEcharcts from "../../components/MyEcharcts";
import { findAllCategroy } from "../../apis/categoryApi";
import { findAllGoods } from "../../apis/goodApi";

export default function Sale() {
  const [option1, setOption1] = useState({});
  const [option2, setOption2] = useState({});
  const [data, setData] = useState([]);
  const [series1, setSeries1] = useState([]);
  const [series2, setSeries2] = useState([]);
  useEffect(() => {
    getSub();
    getGood();
  }, []);
  useEffect(() => {
    setOption1({
      title: {
        text: "分类统计",
        left: "left",
      },
      legend: {
        left: "right",
        orient: "vertical",
      },
      tooltip: {
        trigger: "item",
      },
      series: series1,
    });
    // console.log(option1);
  }, [series1]);
  useEffect(() => {
    setOption2({
      title: {
        text: "分类统计",
        left: "left",
      },
      xAxis: {
        type: "category",
        data: data,
      },
      yAxis: {
        type: "value",
      },
      legend: {
        left: "right",
      },
      tooltip: {
        trigger: "item",
      },
      series: series2
    });
  }, [data,series2]);
  const getSub = async () => {
    let res = await findAllCategroy({ parentId: 0 });
    console.log(res.data.data);
    let arr = res.data.data.map((item) => {
      return { value: item.children.length, name: item.value };
    });
    let temp = [
      {
        name: "分类统计",
        type: "pie",
        radius: "50%",
        data: arr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ];
    setSeries1(temp);
  };
  const getGood = async () => {
    let res = await findAllGoods();
    console.log(res.data.data);
    let arr = [];
    res.data.data.forEach((item) => {
      let f = arr.findIndex((val) => val.name === item.type.name);
      if (f === -1) {
        arr.push({ name: item.type.name, count: 1 });
      } else {
        arr[f].count++;
      }
    });
    console.log(arr);
    setData(arr.map(item=>item.name))
    setSeries2([
      {
        data: arr.map(item=>item.count),
        type: "bar",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ])
  };
  return (
    <React.Fragment>
      <React.Fragment>
        <MyEcharcts option={option1}></MyEcharcts>
      </React.Fragment>
      <React.Fragment>
        <MyEcharcts option={option2}></MyEcharcts>
      </React.Fragment>
    </React.Fragment>
  );
}
