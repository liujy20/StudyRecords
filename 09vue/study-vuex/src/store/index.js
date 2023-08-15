import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      name:'xwg',
      age:12
    }
  },
  getters: {
    getUser(state){
      return state.user
    }
  },
  mutations: {
    changeUser(state,payload){
      state.user=payload
    }
  },
  actions: {
    async getInfo(context,payload){
      let {data}=await axios({
        url:'http://localhost:4001/admin/getUserInfo',
        headers:{
          Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE5ZDM2ZDA0ZjdmOWRjNTE3MjUzMDMiLCJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE2OTIwODI2MDksImV4cCI6MTY5MjE2OTAwOX0.KwsoMUS5rA-4UDD3qH6UwXTa1Cp-OD4nCqvs3C3H86A",
        }
      })
      console.log(data.userInfo);
      context.commit('changeUser',data.userInfo)
    }
  },
  modules: {
  }
})
