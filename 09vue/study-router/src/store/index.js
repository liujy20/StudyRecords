import Vue from "vue";
import Vuex from "vuex";
import $http from '@/http/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},
    menus:[],
    breadcrumb:['首页'],
    tags:[
      { name: "首页",isClosable:false,path:'/home/index' },
    ],
  },
  getters: {
    getUserID(state){
      return state.user.roles[0]._id
    },
    getUser(state){
      return state.user
    },
    getMenus(state){
      return state.menus
    },
    getBreadcrumb(state){
      return state.breadcrumb
    },
    getTags(state){
      return state.tags
    }
  },
  mutations: {
    setInfo(state,payload){
      state.user=payload
    },
    setMenus(state,payload){
      state.menus=payload
    },
    addBreadcrumb(state,payload){
      state.breadcrumb.unshift(payload)
    },
    clearBreadcrumb(state){
      state.breadcrumb.splice(0)
    },
    addTag(state,payload){
      if(!state.tags.some(item=>item.name==payload.name)){
        state.tags.push({
          name:payload.name,
          path:payload.component?payload.component:payload.path,
          isClosable:true
        })
      }
    },
    delTag(state,payload){
      state.tags=state.tags.filter(item=>item!=payload)
    }
    
  },
  actions: {
    async reqInfo(context) {
      let res = await $http.userHttp.getUserInfo();
      context.commit('setInfo',res.data.userInfo);
    },
    async reqMenus(context,payload) {
      let res = await $http.userHttp.getRightById({
        _id: payload,
      });
      context.commit('setMenus',res.data.data.menu);
    },
  },
  modules: {},
});
