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
import EditGood from '../views/subs/EditGood'
import RouterAuth from "./RouterAuth";

const routerList = [
  { path: "/", element: <Home></Home> },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/regiest",
    element: <AntdComp></AntdComp>,
  },
  {
    path: "/home",
    element: <RouterAuth><Home></Home></RouterAuth>,
    children: [
      { path: "main", element: <Main></Main> },
      { path: "user", element: <User></User> },
      { path: "edit", element: <Edit></Edit> },
      { path: "role", element: <Role></Role> },
      { path: "shop", element: <Shop></Shop> },
      {
        path: "finance",
        element: <Finance></Finance>,
        children: [
          { path: "salary", element: <Salary></Salary> },
          { path: "sale", element: <Sale></Sale> },
        ],
      },
      {
        path: "good",
        element: <Good></Good>,
        children: [
          { path: "goodList", element: <GoodList></GoodList> },
          { path: "goodCategory", element: <GoodCategory></GoodCategory> },
          { path: "addGood", element: <AddGood></AddGood> },
          { path: "editGood", element: <EditGood></EditGood> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 not found</h1>,
  },
];

export default routerList;
