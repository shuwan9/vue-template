import { Store } from "vuex"

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

export default new Store({
  state,
  getters,
  mutations,
  actions
})
