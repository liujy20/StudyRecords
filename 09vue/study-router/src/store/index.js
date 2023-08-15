import Vue from "vue";
import Vuex from "vuex";
import $http from '@/http/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},
    menus:[],
    breadcrumb:['首页'],
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
    }
  },
  mutations: {
    setInfo(Store,payload){
      Store.user=payload
    },
    setMenus(Store,payload){
      Store.menus=payload
    },
    addBreadcrumb(store,payload){
      store.breadcrumb.unshift(payload)
    },
    clearBreadcrumb(store){
      store.breadcrumb.splice(0)
    },
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
