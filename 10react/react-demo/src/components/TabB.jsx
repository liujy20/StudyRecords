import style from "../assets/styles/TabB.module.scss";
import React, { Component } from "react";

export default class TabB extends Component {
  state = {
    list: [
      {
        id: 1,
        img: "http://t15.baidu.com/it/u=237558942,3301480408&fm=224&app=112&f=JPEG?w=500&h=500",
        p1: "液体叠加",
        p2: "一块钱一斤",
        price: 1,
      },
      {
        id: 2,
        img: "http://t14.baidu.com/it/u=1740918830,1753245249&fm=224&app=112&f=JPEG?w=500&h=500",
        p1: "火焰特效",
        p2: "二块钱一斤",
        price: 2,
      },
      {
        id: 3,
        img: "http://t13.baidu.com/it/u=102932727,3702738870&fm=224&app=112&f=JPEG?w=500&h=500",
        p1: "朦胧背景",
        p2: "三块钱一斤",
        price: 3,
      },
      {
        id: 4,
        img: "http://t15.baidu.com/it/u=1876999469,3124840844&fm=224&app=112&f=JPEG?w=500&h=500",
        p1: "潮流艺术",
        p2: "四块钱一斤",
        price: 4,
      },
    ],
    car: [
      {
        id: 1,
        img: "http://t15.baidu.com/it/u=237558942,3301480408&fm=224&app=112&f=JPEG?w=500&h=500",
        p1: "液体叠加",
        p2: "一块钱一斤",
        price: 1,
        count: 1,
      },
    ],
  };
  addGood(val) {
    let {car}=this.state
    if(car.some(item=>{
      console.log(item.id,val.id);
      return item.id===val.id
    })){
      alert('购物车存在此商品')
    }else{
      car.push({
        ...val,
        count:1
      })
      this.setState({
        car
      })
    }
  }
  add(id){
    let {car}=this.state
    car.forEach(item=>{
      if(item.id===id){
        item.count++
      }
    })
    this.setState({
      car
    })
  }
  sub(id){
    let {car}=this.state
    car.forEach(item=>{
      if(item.id===id){
        item.count--
      }
    })
    this.setState({
      car
    })
  }
  removeGood(id){
    let {car}=this.state
    car=car.filter(item=>{
     return item.id!==id
    })
    this.setState({
      car
    })
  }
  get allPrice(){
    let {car}=this.state
    let all=0
    car.forEach(item=>{
      all+=item.count*item.price
    })
    console.log('all',all);
    return all
  }
  render() {
    let { list, car } = this.state;
    return (
      <React.Fragment>
        <div className={style.content}>
          <div className={style.shop}>
            <div className={style.tit}>产品</div>
            <div className={style.list}>
              {list.map((item) => {
                return (
                  <div className={style.item} key={item.id}>
                    <img src={item.img} alt="" />
                    <p>{item.p1}</p>
                    <p>{item.p2}</p>
                    <button
                      onClick={() => {
                        this.addGood(item);
                      }}
                    >
                      加入购物车
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.car}>
            <div className={style.tit}>购物车</div>
            <div className={style.table}>
              <table>
                <thead>
                  <tr>
                    <th>编号</th>
                    <th>图片</th>
                    <th>标题</th>
                    <th>价格</th>
                    <th>数量</th>
                    <th>总价</th>
                    <th>删除</th>
                  </tr>
                </thead>
                <tbody>
                  {car.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img src={item.img} alt="" />
                        </td>
                        <td>{item.p1}</td>
                        <td>{item.price}</td>
                        <td>
                          <button disabled={item.count === 1} onClick={()=>{this.sub(item.id)}}>-</button>
                          <span>{item.count}</span>
                          <button onClick={()=>{this.add(item.id)}}>+</button>
                        </td>
                        <td>{item.count * item.price}</td>
                        <td>
                          <button onClick={()=>{this.removeGood(item.id)}}>删除</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={style.allPrice}>总价为:{this.allPrice}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
