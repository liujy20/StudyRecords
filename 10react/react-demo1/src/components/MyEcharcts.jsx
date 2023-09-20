import React from "react";
import ReactEcharts from "echarts-for-react";
export default function MyEcharcts({option}) {

  return (
    <div style={{'width':'100%'}}>
      <ReactEcharts
        option={option}
        style={{ width: "80%", height: "500px" }}
      ></ReactEcharts>
    </div>
  );
}
