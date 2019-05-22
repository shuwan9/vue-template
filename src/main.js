import './scss/index.scss'

import Vue from 'vue'
import router from './router'
import store from './store'

import Ls from './plugins/ls'

import App from './App.vue'

Vue.use(Ls)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
