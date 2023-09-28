import {defineStore} from 'pinia'

export const menuStore=defineStore('menuStore',{
  state:()=>{
    return{
      menu:[]
    }
  },
  getters:{
    getMenu(state){
      return state.menu
    }
  },
  actions:{
    setMenu(data){
      this.menu=data
    }
  }
})