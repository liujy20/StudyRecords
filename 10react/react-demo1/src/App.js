import React, { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
// import AntdComp from "./components/AntdComp";
import TodoList from "./components/TodoList";
import Login from "./views/Login";
import Home from "./views/Home";
import User from "./views/subs/User";
import Edit from "./views/subs/Edit";
import Finance from "./views/subs/Finance";
import Good from "./views/subs/Good";
import GoodList from "./views/subs/GoodList";
import GoodCategory from "./views/subs/GoodCategory";
import Main from "./views/subs/Main";
import Role from "./views/subs/Role";
import Salary from "./views/subs/Salary";
import Sale from "./views/subs/Sale";
import Shop from "./views/subs/Shop";
import AddGood from "./views/subs/AddGood";

// 懒加载
let AntdComp=lazy(()=>import('@/components/AntdComp'))
export default function App() {
  return (
    <div>
      {/* <AntdComp></AntdComp> */}
      {/* <TodoList></TodoList> */}
      {/* <Login></Login> */}
      <ConfigProvider
        theme={{
          token: {},
        }}
      >
        <React.Suspense>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/regiest" element={<AntdComp></AntdComp>}></Route>
            <Route path="/home" element={<Home></Home>}>
              <Route index element={<Main></Main>}></Route>
              <Route path="Main" element={<Main></Main>}></Route>
              <Route path="user" element={<User></User>}></Route>
              <Route path="edit" element={<Edit></Edit>}></Route>
              <Route path="Role" element={<Role></Role>}></Route>
              <Route path="Shop" element={<Shop></Shop>}></Route>
              <Route path="Finance" element={<Finance></Finance>}>
                <Route path="Salary" element={<Salary></Salary>}></Route>
                <Route path="Sale" element={<Sale></Sale>}></Route>
              </Route>
              <Route path="Good" element={<Good></Good>}>
                <Route path="GoodList" element={<GoodList></GoodList>}></Route>
                <Route
                  path="GoodCategory"
                  element={<GoodCategory></GoodCategory>}
                ></Route>
                <Route path="AddGood" element={<AddGood></AddGood>}></Route>
              </Route>
            </Route>
            <Route path="/todolist" element={<TodoList></TodoList>}></Route>
          </Routes>
        </BrowserRouter>
        </React.Suspense>
        
      </ConfigProvider>
    </div>
  );
}
