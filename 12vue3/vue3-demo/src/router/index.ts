import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
const routes: Array<RouteRecordRaw> = [
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
    path: "/",
    redirect: "/home/main",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
