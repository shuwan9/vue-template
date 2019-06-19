const getters = {
  cartsTotal(state) {
    const { carts } = state
    const total = Object.keys(carts).reduce((total, item) => {
      return total + carts[item].length
    }, 0)
    return total > 99 ? "..." : total
  }
}

export default getters
