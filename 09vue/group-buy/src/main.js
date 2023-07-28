import Vue from 'vue'

// import App from './StudyApp.vue'
// import App from './App1.vue'
// import App from './App.vue'
import App from './AppEle.vue'


import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
