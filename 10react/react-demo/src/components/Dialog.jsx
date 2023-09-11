import React, { Component } from "react";
import style from "../assets/styles/Dialog.module.scss";
export default class dialog extends Component {
  close=()=>{
    let {close}=this.props
    close()
  }
  submit=()=>{
    let {submit}=this.props
    submit()
  }
  render() {
    let { title, visible } = this.props;
    if (visible) {
      return (
      <div className={style.bg}>
        <div className={style.box}>
          <h2>{title}</h2>
          {this.props.children}
          <div className={style.btns}>
            <button onClick={this.submit}>提交</button>
            <button onClick={this.close}>关闭</button>
          </div>
        </div>
      </div>
    );
    }else{
      return null
    }
    
  }
}
