import React from "react";
import { Button } from "antd";
import style from "../assets/styles/AntdComp.module.less";
export default function AntdComp() {
  return (
    <div>
      <h2 className={style.name}>AntdComp</h2>
      <div className={style.button}>
        <h3>button</h3>
        <Button>按钮</Button>
        <Button type="dashed">按钮</Button>
      </div>
    </div>
  );
}
