import React, { Component } from "react";
import style from "../assets/styles/tabA.module.css";

export default class TabA extends Component {
  list() {
    return [1,2,3,4,5].map(item=>{
      return <tr key={item} className={style.item}>
      <td className={style.id}>123asdd12e12eqwdad</td>
      <td className={style.name}>跨店满减</td>
      <td className={style.img}>
        <img src="" alt="" />
      </td>
      <td className={style.type}>满减券</td>
      <td className={style.count}>300</td>
      <td className={style.time}>31天</td>
      <td className={style.status}>开启</td>
      <td className={style.option}>
        <button>删除</button>
        <button>修改</button>
      </td>
    </tr>
    });
  }
  render() {
    return (
      <div className={style.container}>
        <div className={style.top}>
          <select name="" id="">
          <option disabled selected value="">请选择</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <input type="text" placeholder="请输入搜索内容" />
          <button>添加</button>
        </div>
        <div className={style.bottom}>
          <table className={style.table}>
            <thead className={style.tHead}>
              <tr className={style.item}>
                <th className={style.id}>编号</th>
                <th className={style.name}>优惠券名称</th>
                <th className={style.img}>优惠券图片</th>
                <th className={style.type}>优惠券类型</th>
                <th className={style.count}>面值</th>
                <th className={style.time}>使用时间</th>
                <th className={style.status}>是否开启</th>
                <th className={style.option}>操作</th>
              </tr>
            </thead>
            <tbody className={style.tBody}>
              {this.list()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
