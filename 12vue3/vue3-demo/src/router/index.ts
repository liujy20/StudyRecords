import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    redirect: "/home/main",
  },
  {
    path: "/",
    redirect: "/home/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "main",
        name: "main",
        component: () => import("@/views/sub/Main.vue"),
      },
    ],
  },
  {
    path: "/gen",
    name: "gen",
    component: Home,
    children: [
      {
        path: "apply",
        name: "apply",
        component: () => import("@/views/sub/Apply.vue"),
      },
      {
        path: "apply/charge",
        name: "charge",
        component: () => import("@/views/sub/Charge.vue"),
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: Home,
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("@/views/sub/User.vue"),
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/sub/Role.vue"),
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("@/views/sub/Menu.vue"),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: ()=>import('@/components/NotFound.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
