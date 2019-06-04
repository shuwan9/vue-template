import "./scss/index.scss"

import install from "@/install"

const Vue = install()

import router from "./router"
import store from "./store"

import App from "./App.vue"

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app")
