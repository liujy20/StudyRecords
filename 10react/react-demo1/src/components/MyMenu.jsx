import React from "react";
import { Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTab, toTab } from "../redux/actions";

export default function MyMenu() {
  const dispatch=useDispatch()
  const defaultKey=useSelector((state)=>{
    return state.tabStore.aliveKey
  })
  const item = [
    {
      label: <Link to="/home/main">系统主页</Link>,
      key: "/home/main",
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to="/home/user">用户管理</Link>,
      key: "/home/user",
      icon: <DesktopOutlined />,
    },
    {
      label: <Link to="/home/role">角色管理</Link>,
      key: "/home/role",
      icon: <TeamOutlined />,
    },
    {
      label: <Link to="/home/shop">店铺管理</Link>,
      key: "/home/shop",
      icon: <FileOutlined />,
    },
    {
      label: "商品管理",
      key: "/home/good",
      icon: <DesktopOutlined />,
      children: [
        {
          label: <Link to="/home/good/goodlist">商品列表</Link>,
          key: "/home/good/goodlist",
        },
        {
          label: <Link to="/home/good/goodcategory">商品分类</Link>,
          key: "/home/good/goodcategory",
        },
      ],
    },
    {
      label: "财务管理",
      key: "/home/finance",
      icon: <DesktopOutlined />,
      children: [
        {
          label: <Link to="/home/finance/salary">工资数据</Link>,
          key: "/home/finance/salary",
        },
        {
          label: <Link to="/home/finance/sale">销售数据</Link>,
          key: "/home/finance/sale",
        },
      ],
    },
  ];
  const roleMenu = (arr, renderList = []) => {
    let menu = JSON.parse(localStorage.getItem("userInfo")).role.menus || [];
    // console.log(arr);
    for (let item of arr) {
      if (!item.children) {
        if (menu.includes(item.key)) {
          renderList.push(item);
        }
      } else {
        // console.log(item);
        let children = roleMenu(item.children);
        if (children) {
          renderList.push({ ...item, children });
        }
      }
    }
    return renderList;
  };
  const menuClick=(e)=>{
    console.log(e);
    console.log(e.domEvent.target.innerText);
    dispatch(addTab({
      key:e.key,
      name:e.domEvent.target.innerText
    }))
    dispatch(toTab(e.key))
  }
  return (
    <div>
      <Menu
        theme="dark"
        defaultSelectedKeys={defaultKey}
        selectedKeys={defaultKey}
        defaultOpenKeys={["/home/good", "/home/finance"]}
        mode="inline"
        items={roleMenu(item)}
        onClick={menuClick}
      />
    </div>
  );
}
