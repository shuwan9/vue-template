import "@/scss/index.scss"

import install from "@/install"

const Vue = install()

import $http from "@/axios"

Vue.prototype.$http = $http

import router from "@/router"
import store from "@/store"

import App from "@/App.vue"

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

export default app
