import http from "@/http";
import Vue from "vue";
import VueRouter from "vue-router";
import $http from "@/http/index";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
// 重写了原型上的push方法，统一的处理了错误信息
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  // login
  {
    path: "/login",
    name: "login",
    // component:LoginView
    component: () => import("@/views/LoginView.vue"),
  },
  // default
  {
    path: "*",
    name: "*",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
  },
  // home
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "index",
        name: "homeIndex",
        component: () => import("@/views/home.vue"),
      },
    ],
  },
];
const userRouter = [
  // user
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "content",
        name: "content",
        component: () => import("@/views/Content/Content.vue"),
      },
      {
        path: "addUser",
        name: "addUser",
        component: () => import("@/views/AddUser/AddUser.vue"),
      },
      {
        path: "modify",
        name: "modify",
        component: () => import("@/views/Modify/Modify.vue"),
      },
    ],
  },
  // order
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/Order/Order.vue"),
      },
    ],
  },
  // list
  {
    path: "/list",
    name: "list",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "good",
        name: "good",
        component: () => import("@/views/Good/Good.vue"),
      },
      {
        path: "group",
        name: "group",
        component: () => import("@/views/Group/Group.vue"),
      },
    ],
  },
  // axios
  {
    path: "/axios",
    name: "axios",
    component: () => import("@/views/Axios.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  name: "zs",
});
let isHas = false;
router.beforeEach(async (to, from, next) => {
  console.log(to);
  if (to.path == "/login") {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      console.log("未登录");
      next("/");
    } else {
      next();
      if (!isHas) {
        isHas = !isHas;
        let res1 = await $http.userHttp.getUserInfo();
        // console.log(res);
        let _id = res1.data.userInfo.roles[0]._id;
        let res2 = await $http.userHttp.getRightById({ _id });
        let menus = res2.data.data.menu;
        console.log(menus);
        userRouter.forEach((item) => {
          router.addRoute(item);
        });
      }
    }
  }
});

export default router;
