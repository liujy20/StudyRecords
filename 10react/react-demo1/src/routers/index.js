import AntdComp from "../components/AntdComp";
import Login from "../views/Login";
import Home from "../views/Home";
import User from "../views/subs/User";
import Edit from "../views/subs/Edit";
import Finance from "../views/subs/Finance";
import Good from "../views/subs/Good";
import GoodList from "../views/subs/GoodList";
import GoodCategory from "../views/subs/GoodCategory";
import Main from "../views/subs/Main";
import Role from "../views/subs/Role";
import Salary from "../views/subs/Salary";
import Sale from "../views/subs/Sale";
import Shop from "../views/subs/Shop";
import AddGood from "../views/subs/AddGood";
import EditGood from "../views/subs/EditGood";
import RouterAuth from "./RouterAuth";
export const defaultList = [
  {
    path: "*",
    element: <h1>404 not found</h1>,
    name: "404",
  },
  {
    path: "/login",
    element: <Login></Login>,
    name: "login",
  },
  {
    path: "/regiest",
    element: <AntdComp></AntdComp>,
    name: "regiest",
  },
];
export const routerList = [
  {
    path: "/",
    element: <Home></Home>,
    name: "home",
    children: [
      { index: true, element: <Main></Main>, name: "main" },
      { path: "main", element: <Main></Main>, name: "main" },
    ],
  },

  {
    path: "/home",
    element: (
      <RouterAuth>
        <Home></Home>
      </RouterAuth>
    ),
    name: "home",
    children: [
      { index: true, element: <Main></Main>, name: "main" },
      { path: "main", element: <Main></Main>, name: "main" },
      { path: "user", element: <User></User>, name: "user" },
      { path: "edit", element: <Edit></Edit>, name: "edit" },
      { path: "role", element: <Role></Role>, name: "role" },
      { path: "shop", element: <Shop></Shop>, name: "shop" },
      {
        path: "finance",
        element: <Finance></Finance>,
        name: "finance",
        children: [
          { path: "salary", element: <Salary></Salary>, name: "salary" },
          { path: "sale", element: <Sale></Sale>, name: "sale" },
        ],
      },
      {
        path: "good",
        element: <Good></Good>,
        name: "good",
        children: [
          {
            path: "goodList",
            element: <GoodList></GoodList>,
            name: "goodlist",
          },
          {
            path: "goodCategory",
            element: <GoodCategory></GoodCategory>,
            name: "goodcategory",
          },
          { path: "addGood", element: <AddGood></AddGood>, name: "addGood" },
          {
            path: "editGood",
            element: <EditGood></EditGood>,
            name: "editGood",
          },
        ],
      },
    ],
  },
];
