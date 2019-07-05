const getters = {
  mealsTotal(state) {
    const { carts, dishType } = state
    const cart = carts.filter(cart => {
      return cart.key == dishType.key && cart.label == dishType.label
    })[0]
    const total = cart.meals.reduce((total, meal) => {
      return total + meal.hasAddNumber
    }, 0)
    return total > 99 ? "..." : total
  },
  meals(state) {
    const { carts, dishType } = state
    const cart = carts.filter(cart => {
      return cart.key == dishType.key && cart.label == dishType.label
    })[0]
    return cart.meals
  },
  supermarketCartTotal(state) {
    const total = state.supermarketCart.reduce((total, item) => {
      return total + (item.price * item.hasAddNumber) / 100
    }, 0)
    return total > 99 ? "..." : total
  }
}

export default getters
