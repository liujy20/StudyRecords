import Vue from 'vue'
// import App from './App.vue'
import App from './App1.vue'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
