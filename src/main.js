import "@/scss/index.scss"

import install from "@/install"

import $http from "@/axios"

import filters from "@/filters"
import router from "@/router"
import store from "@/store"

import App from "@/App.vue"

const Vue = install()

Vue.prototype.$http = $http

Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter])
})

Vue.config.productionTip = false
Vue.config.devtools = true

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

export default app
