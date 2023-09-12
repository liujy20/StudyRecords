import React, { Component } from "react";

export default class TabD extends Component {
  state = {
    list: [],
    isRandom: true,
    currentIndex: -1,
    name: "",
  };
  componentDidMount() {
    this.startRandom();
  }
  componentWillUnmount() {
    this.stopRandom();
  }

  createList = () => {
    const arr = [
      "张三",
      "李四",
      "王五",
      "赵六",
      "钱七",
      "孙八",
      "周九",
      "吴十",
      "郑十一",
      "王十二",
      "刘十三",
      "陈十四",
      "杨十五",
      "黄十六",
      "林十七",
      "周十八",
      "吴十九",
      "郑二十",
      "徐三十",
      "朱四十",
    ];
    let list = [];
    for (let i = 0; i < 4; i++) {
      let person = arr.splice(Math.floor(Math.random() * arr.length), 1);
      // console.log(person);
      list.push(person);
    }
    this.setState({
      list,
    });
  };
  startRandom = () => {
    this.setState({
      isRandom: true,
      currentIndex: -1,
    });
    this.timer = setInterval(() => {
      this.createList();
    }, 300);
  };
  stopRandom = () => {
    clearInterval(this.timer);
    this.setState({
      isRandom: false,
    });
  };
  getIndex = (event) => {
    if (event.target.nodeName === "LI") {
      // console.log(event.target);
      this.setState({
        name: event.target.innerText,
        currentIndex: Number(event.target.getAttribute("index")),
      });
    }
  };

  render() {
    const { list, isRandom, currentIndex, name } = this.state;
    return (
      <div>
        <h3>中奖名单</h3>
        <ul onClick={this.getIndex}>
          {list.map((item, index) => {
            return (
              <li
                key={item}
                index={index}
                style={currentIndex === index ? { color: "tomato" } : {}}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <div>中奖人:{name}</div>
        <button onClick={isRandom ? this.stopRandom : this.startRandom}>
          {isRandom ? "暂停" : "开始"}
        </button>
      </div>
    );
  }
}
