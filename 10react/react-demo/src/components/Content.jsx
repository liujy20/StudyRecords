import React, { Component } from "react";
import "../assets/styles/content.css";
import TabA from "./TabA";
import TabB from "./TabB";
import TabC from "./TabC";
import TabD from "./TabD";


export default class Content extends Component {
  state = {
    active: "TabA",
  };
  check(event,val) {
    console.log(event.target);
    this.setState({
      active: val,
    });
  }

  show() {
    let { active } = this.state;
    switch(active){
      case "TabA":
        return <TabA></TabA>;
      case "TabB":
        return <TabB></TabB>;
      case "TabC":
        return <TabC></TabC>;
      case "TabD":
        return <TabD></TabD>;
      default:
        return <TabA></TabA>; 
    }
  }
  render() {
    let {active}=this.state
    return (
      
      <div className="content">
        <div className="menu">
          <ul>
            <li
              onClick={(event) => {
                this.check(event,"TabA");
              }}
              className={active==='TabA'?"active":''}
            >
              拼团商品
            </li>
            <li
              onClick={(event) => {
                this.check(event,"TabB");
              }}
              className={active==='TabB'?"active":''}
            >
              拼团列表
            </li>
            <li
              onClick={(event) => {
                this.check(event,"TabC");
              }}
              className={active==='TabC'?"active":''}
            >
              更多
            </li>
            <li
              onClick={(event) => {
                this.check(event,"TabD");
              }}
              className={active==='TabD'?"active":''}
            >
              抽奖
            </li>
          </ul>
        </div>
        <div className="main">
          {this.show()}
        </div>
      </div>
    );
  }
}
