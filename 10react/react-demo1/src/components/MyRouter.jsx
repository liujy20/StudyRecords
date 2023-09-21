import { useRoutes } from "react-router-dom";
import {defaultList,routerList} from "../routers";
import { useEffect, useState } from "react";
export default function MyRouter() {
  const [data,setData]=useState(defaultList)
  const [userRole,setUserRole]=useState([])
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    if(!localStorage.getItem('userInfo')){
      return
    }
    let info = JSON.parse(localStorage.getItem("userInfo")).role.menus;

    let role = info.map((item) => {
      let arr = item.split("/");
      console.log(arr[arr.length - 1]);
      return arr[arr.length - 1];
    });
    setUserRole(role)
    console.log('role',role);
    let arr=roleRouter(routerList,[...data])
    console.log('arr',arr);
  };
  const roleRouter=(arr,renderList=[])=>{
    console.log(userRole);
    for (let item of arr) {
      if (!item.children) {
        if (userRole.includes(item.name)) {
          renderList.push(item);
        }
        continue
      } else {
        // console.log(item);
        // let children = roleMenu(item.children);
        // if (children) {
        //   renderList.push({ ...item, children });
        // }
        if (userRole.includes(item.name)) {
          renderList.push(item);
        }
      }
    }
    return renderList
  }
  console.log(data);
  let element = useRoutes(data);
  return element;
}
