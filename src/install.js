import Vue from "vue"

import Router from "vue-router"
import Vuex from "vuex"

import MandMobile from "mand-mobile"

import Ls from "@/plugins/LocalStorage"

const install = () => {
  Vue.use(Router)
  Vue.use(Vuex)

  Vue.use(MandMobile)

  Vue.use(Ls)

  return Vue
}

export default install
