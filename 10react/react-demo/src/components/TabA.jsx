import React, { Component } from "react";
import Paging from "./Paging";
import Dialog from "./Dialog";
import style from "../assets/styles/tabA.module.css";

export default class TabA extends Component {
  state = {
    data: [
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2023-01-13 17:39:42", "2023-02-13 17:39:42"],
        _id: "63919f95024a7602dc78082a",
        title: "测试优惠券",
        receiveType: "2",
        price: 300,
        state: false,
        show: false,
        system_data: true,
        create_time: "2022-12-08T08:25:57.209Z",
        imgSrc: "https://pic.616pic.com/ys_bnew_img/00/06/12/6QLoLGyq3C.jpg",
      },
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2022-01-13 17:39:42", "2024-01-13 17:39:42"],
        _id: "63bd14c40d58511b7c6b6b18",
        title: "跨店满减",
        receiveType: "1",
        price: 155,
        state: true,
        show: true,
        create_time: "2023-01-10T07:33:24.011Z",
        imgSrc:
          "https://pic2.zhimg.com/v2-12943651b8b7fb48144151e638c8ed81_1440w.jpg?source=172ae18b",
      },
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2022-01-13 17:39:42", "2024-01-13 17:39:42"],
        _id: "63bd14c40d58511b7c6b6b19",
        title: "新人券",
        receiveType: "2",
        price: 241,
        state: true,
        show: true,
        create_time: "2023-01-10T07:33:24.011Z",
        imgSrc:
          "https://pic2.zhimg.com/v2-12943651b8b7fb48144151e638c8ed81_1440w.jpg?source=172ae18b",
      },
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2022-01-13 17:39:42", "2024-01-13 17:39:42"],
        _id: "63bd14c40d58511b7c6b6b20",
        title: "满100减20",
        receiveType: "3",
        price: 345,
        state: true,
        show: true,
        create_time: "2023-01-10T07:33:24.011Z",
        imgSrc:
          "https://pic2.zhimg.com/v2-12943651b8b7fb48144151e638c8ed81_1440w.jpg?source=172ae18b",
      },
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2022-01-13 17:39:42", "2022-01-15 17:39:42"],
        _id: "63bd14c40d58511b7c6b6b21",
        title: "数码产品券",
        receiveType: "1",
        price: 167,
        state: true,
        show: true,
        create_time: "2023-01-10T07:33:24.011Z",
        imgSrc:
          "https://pic2.zhimg.com/v2-12943651b8b7fb48144151e638c8ed81_1440w.jpg?source=172ae18b",
      },
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2022-01-13 17:39:42", "2022-02-13 17:39:42"],
        _id: "63bd14c40d58511b7c6b6b22",
        title: "跨店满减",
        receiveType: "2",
        price: 144,
        state: true,
        show: true,
        create_time: "2023-01-10T07:33:24.011Z",
        imgSrc:
          "https://pic2.zhimg.com/v2-12943651b8b7fb48144151e638c8ed81_1440w.jpg?source=172ae18b",
      },
      {
        time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
        useTime: ["2022-01-13 17:39:42", "2022-01-13 17:39:42"],
        _id: "63bd14c40d58511b7c6b6b23",
        title: "中秋现礼券",
        receiveType: "3",
        price: 254,
        state: true,
        show: true,
        create_time: "2023-01-10T07:33:24.011Z",
        imgSrc:
          "https://pic2.zhimg.com/v2-12943651b8b7fb48144151e638c8ed81_1440w.jpg?source=172ae18b",
      },
    ],
    chooseType: "",
    searchType: "",
    searchName: "",
    searchData: "",
    isUp: null,
    pageSize: 5,
    currentPage: 1,
    visible1: false,
    visible2: false,

    ytime: [],
    ytitle: "",
    yreceiveType: "1",
    yprice: "",
    ystate: false,
    yimgSrc:
      "https://woniuimage.oss-cn-hangzhou.aliyuncs.com/woniuimage/user/icon/user-icon-default.png",
  };
  /**
   * 渲染券类型
   * @param {*} val
   * @returns
   */
  changeType(val) {
    switch (val) {
      case "1":
        return "新人券";
      case "2":
        return "满减券";
      case "3":
        return "通用券";
      default:
        return "新人券";
    }
  }
  /**
   * 渲染时间
   * @param {*} arr
   * @returns
   */
  timeFormat(arr) {
    let begin = new Date(arr[0]);
    let end = new Date(arr[1]);
    let time = (end - begin) / 1000 / 60 / 60 / 24;
    return time ? time + "天" : "即将过期";
  }
  /**
   * 计算属性,搜索符合条件的列表项
   */
  get list() {
    let { searchData, chooseType, data } = this.state;
    return data.filter((item) => {
      if (!searchData || !chooseType) {
        return true;
      } else {
        if (item[chooseType].indexOf(searchData) !== -1) {
          return true;
        } else {
          return false;
        }
      }
    });
  }
  /**
   * 计算属性,选择升序或降序排列
   */
  get sortList() {
    let { isUp } = this.state;
    if (isUp == null) return this.list;
    return this.list.sort((a, b) => {
      if (isUp) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
  /**
   * 删除
   * @param {*} obj
   */
  del(obj) {
    this.setState({
      data: this.state.data.filter((item) => {
        return item._id !== obj._id;
      }),
    });
  }
  /**
   * 升序
   */
  toUp() {
    this.setState({
      isUp: true,
    });
  }
  /**
   * 降序
   */
  toDown() {
    this.setState({
      isUp: false,
    });
  }
  /**
   * 搜索
   */
  search() {
    console.log(this);
  }
  /**
   * 搜索类型
   * @param {*} event
   */
  chooseType = (event) => {
    console.log(event.target.value);
    this.setState({
      chooseType: event.target.value,
      searchData: "",
    });
  };
  /**
   * 搜索内容
   * @param {*} event
   */
  searchData = (event) => {
    console.log(event.target.value);
    this.setState({
      searchData: event.target.value,
    });
  };
  /**
   * 修改页数
   * @param {*} index
   */
  changePage = (index) => {
    console.log("parent", index);
    this.setState({
      currentPage: index,
    });
  };
  /**
   * 修改页面大小
   * @param {*} index
   */
  changeSize = (index) => {
    console.log("parent", index);
    this.setState({
      pageSize: index,
    });
  };
  /**
   * 添加数据
   */
  add = () => {
    this.setState({
      visible1: true,
      ytime: [],
      ytitle: "",
      yreceiveType: "1",
      yprice: "",
      ystate: false,
      yimgSrc:
        "https://woniuimage.oss-cn-hangzhou.aliyuncs.com/woniuimage/user/icon/user-icon-default.png",
    });
  };
  /**
   * 关闭盒子
   */
  closeBox = () => {
    this.setState({
      visible1: false,
    });
  };
  /**
   * 提交数据
   */
  submit = () => {
    let { ytitle, yreceiveType, yprice, yimgSrc, ytime, ystate, data } =
      this.state;
    let obj = {
      time: ["2021-01-13 17:39:42", "2023-01-13 17:39:42"],
      useTime: ytime,
      _id: "63bd14c40d58511b7c6b6b99",
      title: ytitle,
      receiveType: yreceiveType,
      price: yprice,
      state: ystate,
      show: true,
      create_time: "2023-01-10T07:33:24.011Z",
      imgSrc: yimgSrc,
    };
    console.log(obj);
    data.push(obj);
    this.setState({
      data,
    });
    this.closeBox();
  };
  /**
   * 选择状态
   * @param {*} e 
   */
  changeStatus = (e) => {
    console.log(e.target.value);
    this.setState({
      ystate: JSON.parse(e.target.value),
    });
    console.log(this.state.ystate);
  };

  /**
   * 选择时间
   * @param {*} e 
   */
  changeTime = (e) => {
    let value = e.target.value;
    console.log(value);
    let { ytime } = this.state;
    if (e.target.checked) {
      ytime.push(value);
    } else {
      let index = ytime.indexOf((item) => item === value);
      ytime.splice(index, 1);
    }
    this.setState({
      ytime,
    });
  };
  render() {
    let {
      currentPage,
      pageSize,
      visible1,
      ytitle,
      yreceiveType,
      yprice,
      yimgSrc,
    } = this.state;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return (
      <div className={style.container}>
        <div className={style.top}>
          <select value={this.state.chooseType} onChange={this.chooseType}>
            <option disabled value="">
              请选择
            </option>
            <option value="title">名字搜索</option>
            <option value="receiveType">类型搜索</option>
          </select>
          {this.state.chooseType !== "receiveType" ? (
            <input
              type="text"
              placeholder="请输入搜索内容"
              value={this.state.searchData}
              onChange={this.searchData}
            />
          ) : (
            <select value={this.state.searchData} onChange={this.searchData}>
              <option disabled value="">
                请选择
              </option>
              <option value="1">新人券</option>
              <option value="2">满减券</option>
              <option value="3">通用券</option>
            </select>
          )}
          <button onClick={() => this.search()}>搜索</button>
          &nbsp;
          <button onClick={() => this.add()}>添加</button>
        </div>
        <div className={style.bottom}>
          <table className={style.table}>
            <thead className={style.tHead}>
              <tr className={style.item}>
                <th className={style.id}>编号</th>
                <th className={style.name}>优惠券名称</th>
                <th className={style.img}>优惠券图片</th>
                <th className={style.type}>优惠券类型</th>
                <th className={style.count}>
                  面值
                  <button
                    onClick={() => {
                      this.toUp();
                    }}
                  >
                    升序
                  </button>
                  <button
                    onClick={() => {
                      this.toDown();
                    }}
                  >
                    降序
                  </button>
                </th>
                <th className={style.time}>使用时间</th>
                <th className={style.status}>是否开启</th>
                <th className={style.option}>操作</th>
              </tr>
            </thead>
            <tbody className={style.tBody}>
              {this.sortList.slice(start, end).map((item) => {
                return (
                  <tr key={item._id} className={style.item}>
                    <td className={style.id}>{item._id}</td>
                    <td className={style.name}>{item.title}</td>
                    <td className={style.img}>
                      <img src={item.imgSrc} alt="" />
                    </td>
                    <td className={style.type}>
                      {this.changeType(item.receiveType)}
                    </td>
                    <td className={style.count}>{item.price}</td>
                    <td className={style.time}>
                      {this.timeFormat(item.useTime)}
                    </td>
                    <td className={style.status}>
                      {item.state ? "开启" : "关闭"}
                    </td>
                    <td className={style.option}>
                      <button
                        onClick={() => {
                          this.del(item);
                        }}
                      >
                        删除
                      </button>
                      <button>修改</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Paging
            total={this.sortList.length}
            currentPage={currentPage}
            pageSize={pageSize}
            parentChangePage={this.changePage}
            parentChangeSize={this.changeSize}
          ></Paging>
        </div>
        <Dialog
          title="添加优惠券"
          visible={visible1}
          close={this.closeBox}
          submit={this.submit}
        >
          <label htmlFor="">优惠券名称</label>
          <input
            type="text"
            value={ytitle}
            onInput={(e) => {
              this.setState({ ytitle: e.target.value });
            }}
          />
          <br />
          <label htmlFor="">优惠券图片</label>
          <input
            type="text"
            value={yimgSrc}
            onInput={(e) => {
              this.setState({ yimgSrc: e.target.value });
            }}
          />
          <br />
          <label htmlFor="">优惠券类型</label>
          <select
            name=""
            id=""
            value={yreceiveType}
            onInput={(e) => {
              this.setState({ yreceiveType: e.target.value });
            }}
          >
            <option value="1">新人券</option>
            <option value="2">满减券</option>
            <option value="3">通用券</option>
          </select>
          <br />
          <label htmlFor="">优惠券面值</label>
          <input
            type="text"
            value={yprice}
            onInput={(e) => {
              this.setState({ yprice: Number(e.target.value) });
            }}
          />
          <br />
          <label htmlFor="">优惠券时间</label>
          <span>2023-1-1</span>
          <input type="checkbox" value="2023-1-1" onChange={this.changeTime} />
          <span>2023-4-1</span>
          <input type="checkbox" value="2023-4-1" onChange={this.changeTime} />
          <br />
          <label htmlFor="">是否开启</label>
          <span>开启</span>
          <input
            type="radio"
            name="status"
            onChange={this.changeStatus}
            value={true}
          />
          <span>关闭</span>
          <input
            type="radio"
            name="status"
            onChange={this.changeStatus}
            value={false}
          />
        </Dialog>
      </div>
    );
  }
}
