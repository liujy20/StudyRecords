import Vue from "vue";
import VueRouter from "vue-router";
import $http from "@/http/index";
import $store from "@/store";

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
  // home
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "index",
        name: "homeIndex",
        // component: () => import("@/views/DashboardTeach.vue"),
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
        // 用户列表
        path: "content",
        name: "usercontent",
        component: () => import("@/views/Content/Content.vue"),
      },
    ],
  },
  // role
  {
    path: "/role",
    name: "role",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        // 角色列表
        path: "list",
        name: "rolelist",
        component: () => import("@/views/RoleList/RoleList.vue"),
        meta: {
          isKeepAlive: true,
        },
      },
    ],
  },
  // admin
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        // 管理员列表
        path: "list",
        name: "adminlist",
        component: () => import("@/views/AdminList/AdminList.vue"),
        meta: {
          isKeepAlive: true,
        },
      },
      {
        // 添加管理员
        path: "addUser",
        name: "adminaddUser",
        component: () => import("@/views/AddUser/AddUser.vue"),
      },
      {
        // 修改管理员
        path: "modify",
        name: "adminmodify",
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
        name: "orderindex",
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
        name: "listgood",
        component: () => import("@/views/Good/Good.vue"),
      },
      {
        path: "group",
        name: "listgroup",
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
  {
    path: "/axios1",
    name: "axios1",
    component: () => import("@/views/Axios.vue"),
  },
  {
    path: "/axios2",
    name: "axios2",
    component: () => import("@/views/Axios.vue"),
  },
  {
    path: "/axios3",
    name: "axios3",
    component: () => import("@/views/Axios.vue"),
  },
  {
    path: "/axios4",
    name: "axios4",
    component: () => import("@/views/Axios.vue"),
  },
  {
    path: "/axios5",
    name: "axios5",
    component: () => import("@/views/Axios.vue"),
  },
  {
    path: "/axios6",
    name: "axios6",
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
  // console.log(to);
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
        // let res1 = await $http.userHttp.getUserInfo();
        // console.log(res1);
        // let _id = res1.data.userInfo.roles[0]._id;
        // let res2 = await $http.userHttp.getRightById({ _id });
        // let menus = res2.data.data.menu;
        // console.log(menus);
        // getRouters(menus).forEach((item) => {
        //   router.addRoute(item);
        // });
        getRouters().forEach((item) => {
          router.addRoute(item);
          // console.log(111);
        });
        router.addRoute({
          path: "*",
          name: "notfound",
          component: () => import("@/views/AboutView.vue"),
        });
      }
    }
  }
});

// 后置守卫
router.afterEach((to, from) => {
  // console.log(to);
  // console.log("routervue", $store.getters.getBreadcrumb);
  renderBreadcrumbByPath(to.fullPath);
  let tag=JSON.parse(localStorage.getItem('tag'))
  console.log('获取Tag',tag);
  $store.commit('addTag',tag)
});
// 生成面包屑
function renderBreadcrumbByPath(fullPath) {
  setTimeout(() => {
    // 初始化面包屑导航
    $store.commit("clearBreadcrumb");
    let menus = $store.getters.getMenus;
    findPath(menus, fullPath);
  }, 300);
}

// 获取路径
function findPath(arr, fullPath) {
  for (let item of arr) {
    let res = false;
    if (item.children) {
      res = findPath(item.children, fullPath);
    }
    if (item.component == fullPath || res) {
      $store.commit("addBreadcrumb", item.name);
      // console.log(item.name);
      return true;
    }
    // if (res) {
    //   $store.commit("addBreadcrumb", item.name);
    //   console.log(item.name);
    //   return true;
    // }
  }
  return false;
}

// 获取路由对象数组
function getRouters(arr) {
  return userRouter;
  if (!arr) return [];
  arr = arr.map((item) => {
    return {
      path: item.component,
      name: item.filePath.replace(/\//g, ""),
      component: () => import(`@/views${item.filePath}.vue`),
      children: getRouters(item.children),
    };
  });
  return arr;
}

export default router;
