import React, { Component } from "react";
import style from "../assets/styles/Paging.module.scss";

export default class Paging extends Component {
  get totalPage() {
    const { pageSize, total } = this.props;
    return Math.ceil(total / pageSize);
  }
  get showPage() {
    const { currentPage } = this.props;
    let temp = [];
    for (let index = 0; index < this.totalPage; index++) {
      temp.push(
        <span index={index + 1} key={index} className={(index+1)===currentPage?style.active+' '+style.page:style.page}>
          {index + 1}
        </span>
      );
    }
    return temp;
  }
  getPage = (event) => {
    if (event.target.nodeName === "SPAN") {
      const page = event.target.getAttribute("index");
      // console.log(event.target.nodeName);
      this.props.parentChangePage(Number(page));
    }
  };
  getSize = (event) => {
      console.log(event.target.value);
      const size=event.target.value
      this.props.parentChangeSize(Number(size))
  };

  render() {
    const { currentPage, pageSize } = this.props;
    return (
      <div className={style.paging}>
        <span>当前第{currentPage}页</span>/<span>共{this.totalPage}页</span>
        <select className={style.size} value={pageSize} onChange={this.getSize}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <input />
        <span onClick={this.getPage}>{this.showPage}</span>
      </div>
    );
  }
}
