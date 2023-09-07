import React, { Component } from "react";
import '../assets/styles/header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="logo">
          <img src="https://gitee.com/static/images/logo-black.svg?t=158106664" alt="" />
        </div>
        <div>
          <span>xwg,你好!</span>
        </div>
      </div>
    );
  }
}
