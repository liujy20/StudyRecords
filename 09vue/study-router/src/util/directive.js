import Vue from "vue";

Vue.directive("super",{
  inserted(el,binding){
    console.log('binding',binding);
    if(!localStorage.getItem('super')){
      el.remove()
    }
  }
})