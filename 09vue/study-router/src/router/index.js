import Vue from "vue";
import VueRouter from "vue-router";

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
  {
    path: "/login",
    name: "login",
    // component:LoginView
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path:'/user',
    name:'user',
    component:()=>import('../views/User.vue') ,
    children:[
      {
        path:'order',
        name:'order',
        component:()=>import('../views/Order/Order.vue')
      },
      {
        path:'content',
        name:'content',
        component:()=>import('../views/Content/Content.vue')
      },
      {
        path:'good',
        name:'good',
        component:()=>import('../views/Good.vue')
      },
      {
        path:'group',
        name:'group',
        component:()=>import('../views/Group.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  name:'zs'
});

export default router;
