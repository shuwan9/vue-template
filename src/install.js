import Vue from "vue"

import Router from "vue-router"
import Vuex from "vuex"

import MuseUI from "muse-ui"

import Ls from "@/plugins/LocalStorage"

const install = () => {
  Vue.use(Router)
  Vue.use(Vuex)
  Vue.use(MuseUI)
  Vue.use(Ls)
  return Vue
}

export default install
