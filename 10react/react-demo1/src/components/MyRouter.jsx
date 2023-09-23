import { useRoutes } from "react-router-dom";
import { defaultList, routerList } from "../routers";
import { useEffect, useState } from "react";
export default function MyRouter() {
  const [data, setData] = useState([...routerList, ...defaultList]);
  let element = useRoutes(data);
  useEffect(() => {
    init();
    console.log('init');
  }, []);
  const init = () => {
    if (!localStorage.getItem("userInfo")) {
      setData(defaultList);
      return;
    }
    let info = JSON.parse(localStorage.getItem("userInfo")).role.menus;

    let role = info.map((item) => {
      let arr = item.split("/");
      // console.log(arr[arr.length - 1]);
      return arr[arr.length - 1];
    });
    console.log("role", role);
    let arr = roleRouter(role, routerList);
    console.log("arr", arr.concat(defaultList));
    setData(arr.concat(defaultList));
  };
  const roleRouter = (role, arr, renderList = []) => {
    for (let item of arr) {
      if (!item.children) {
        if (role.includes(item.name)) {
          renderList.push(item);
        }
      } else {
        let children = roleRouter(role, item.children);
        if (children || item.name === "home") {
          renderList.push({ ...item, children });
        }
      }
    }
    return renderList;
  };
  console.log(data);
  // let element = useRoutes(data);
  return element;
}
