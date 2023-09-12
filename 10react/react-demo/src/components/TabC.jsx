import React, { Component } from "react";

export default class TabC extends Component {
  state={
    list:[],
    myPlate:'',
    status:true,
    currentIndex:-1
  }
  // 生成
  createPlate = () => {
    let {list}=this.state
    list=[]
    const num=[1,2,3,4,5,6,7,8,9,0]
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (let index = 0; index < 5; index++) {
      let x=3,y=2;
      let str='川A-'
      for(let i=0;i<5;i++){
        if(x!==0&&y!==0){
          let arr=num.concat(letters)
          // console.log(arr);
          let choose=arr[Math.floor(Math.random()*arr.length)]
          // console.log(choose,Math.ceil(Math.random()*arr.length));
          str+=choose
          if(typeof choose== "string"){
            y--
          }else{
            x--
          }
        }else if(x!==0){
          str+=num[Math.floor(Math.random()*num.length)]
          x--
        }else{
          str+=letters[Math.floor(Math.random()*letters.length)]
          y--
        }
      }
      list.push(str)
      
    }
    this.setState({
      list
    })
  };
  // 挂载
  componentDidMount(){
    this.timer=setInterval(()=>{
      this.createPlate()
    },300)
  }
  // 销毁
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  // 暂停/开始
  change=()=>{
    let {status}=this.state
   status=!status
   if(status){
    this.timer=setInterval(()=>{
      this.createPlate()
    },300)
    this.setState({
      currentIndex:-1
    })
   }else{
    clearInterval(this.timer)
   }
    this.setState({
      status
    })
  }
  // 选中车牌
  choosePlate=(event)=>{
    if(event.target.nodeName==="LI"){
      this.setState({
        currentIndex:Number(event.target.getAttribute('index'))
      })
    }
  }
  // 获取车牌
  getPlate=(event)=>{
    if(event.target.nodeName==="LI"){
      this.setState({
        myPlate:event.target.innerText
      })
    }
  }
  render() {
    const {list,myPlate,currentIndex}=this.state
    return (
      <div>
        <ul onDoubleClick={this.getPlate} onClick={this.choosePlate} style={{width:'100px'}}>
          {list.map((item,index)=>{
            return (
              <li index={index} key={item} style={currentIndex===index?{border:'1px solid #333'}:{}}>{item}</li>
            )
          })}
        </ul>
        <div>你选中的车牌{myPlate}</div>
        <button onClick={this.change}>暂停/开始</button>
      </div>
    );
  }
}
