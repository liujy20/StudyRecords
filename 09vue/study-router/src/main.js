import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/config/axios.config'
import http from '@/http/index'
import '@/util/directive'

// 全局引用
Vue.prototype.$http=http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
