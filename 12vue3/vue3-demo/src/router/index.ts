import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw>=[
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/Login.vue')
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('@/views/Register.vue')
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/Home.vue'),
    children:[
      {
        path:'main',
    name:'mian',
    component:()=>import('@/views/sub/Main.vue')
      }
    ]
  }
]

const router=createRouter({
  routes,
  history:createWebHistory()
})

export default router