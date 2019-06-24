import Vue from "vue"
const mutations = {
  addToCart(state, meal) {
    const { carts, dishType } = state
    const cart = carts.filter(cart => {
      return cart.key == dishType.key && cart.label == dishType.label
    })[0]
    const hasAddMeal = cart.meals.filter(cartMeal => {
      return cartMeal.id == meal.id
    })[0]
    if (hasAddMeal) {
      Vue.set(hasAddMeal, "hasAddNumber", hasAddMeal.hasAddNumber + 1)
    } else {
      meal.hasAddNumber = 1
      cart.meals.push(meal)
    }
  },
  updateMeals(state, meals) {
    const { carts, dishType } = state
    const cart = carts.filter(cart => {
      return cart.key == dishType.key && cart.label == dishType.label
    })[0]
    cart.meals.forEach((cartMeal, index) => {
      meals.forEach(meal => {
        if (meal.id == cartMeal.id) {
          meal.hasAddNumber = cartMeal.hasAddNumber
          Vue.set(cart.meals, index, meal)
        }
      })
    })
  },
  setShowCartDetail(state, show) {
    state.show.showCartDetail = show
  },
  setDishType(state, dishType) {
    state.dishType = dishType
  },
  setDishTypes(state, dishTypes) {
    state.dishTypes = dishTypes
  },
  clearCarts(state) {
    const { carts, dishType } = state
    const cart = carts.filter(cart => {
      return cart.key == dishType.key && cart.label == dishType.label
    })[0]
    cart.meals.forEach(meal => {
      meal.hasAddNumber = 0
    })
  }
}
export default mutations
