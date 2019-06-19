const mutations = {
  addToCarts(state, payload) {
    const { menu, meal } = payload
    state["carts"][menu].push(meal)
  },
  setCurrentMenu(state, payload) {
    const { menu } = payload
    state.currentMenu = menu
  }
}
export default mutations
