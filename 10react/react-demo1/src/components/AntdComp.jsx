import React, { useState } from "react";
import { Button, Select } from "antd";
import style from "../assets/styles/AntdComp.module.less";
export default function AntdComp() {
  const [val,setVal]=useState('小五')
  return (
    <div>
      <h2 className={style.name}>AntdComp</h2>
      <div className={style.button}>
        <h3>button</h3>
        <Button>按钮</Button>
        <Button type="dashed">按钮</Button>
      </div>
      <Select
        value={val}
        style={{ width: "300px" }}
        onChange={(event)=>setVal(event)}
        options={[
          { value: "小五", label: "小五" },
          { value: "小六", label: "小六" },
        ]}
      ></Select>
      <Button onClick={()=>setVal('')}>reset</Button>
    </div>
  );
}
