import React, { useState,useMemo, useRef } from "react";
import { Button } from "antd";
import style from "../assets/styles/TodoList.module.less";

export default function TodoList() {
  const [list,setList] = useState([
    { id: 1, name: "vue", status: false },
    { id: 2, name: "react", status: false },
    { id: 3, name: "java", status: false },
  ]);
  const [status, setStatus] = useState("all");
 
  const filter=useMemo(()=>{
    switch (status){
      case 'all':return list;
      case 'done':return list.filter(item=>item.status);
      case 'doing':return list.filter(item=>!item.status);

      default: return list
    }
  },[list,status])
  const inputRef=useRef()
  // 筛选
  const getList = (val) => {
    setStatus(val);
  };
  // 修改状态
  const changeStatus=(event)=>{
    // console.log(event.target.getAttribute('index'));
    let temp=[...list]
    temp.forEach(item=>{
      if(item.id===Number(event.target.getAttribute('index'))){
        item.status=!item.status
      }
    })
    setList(temp)
  }
  const add=()=>{
    let obj={
      id:list.length+1,
      name:inputRef.current.value,
      status:false
    }
    list.push(obj)
    setList([...list])
  }
  return (
    <div style={{width:'300px'}}>
      <input ref={inputRef}/><Button onClick={add}>添加</Button>
      <ul>
        {filter.map((item) => {
          return <li key={item.id} index={item.id} onDoubleClick={changeStatus} className={item.status?style.done:{}}>{item.name}</li>;
        })}
      </ul>
      <Button onClick={() => getList("all")}>全部</Button>
      <Button onClick={() => getList("done")}>已完成</Button>
      <Button onClick={() => getList("doing")}>未完成</Button>
      
      <span>{status}</span>
    </div>
  );
}
