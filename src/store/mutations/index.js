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
  },
  // addToSupermarketCart(state, product) {
  //   const { supermarketCart } = state
  //   // supermarketCart.forEach((item, index) => console.log(index, item))
  //   const productThatHasAdd = supermarketCart.filter(item => {
  //     return item.id == product.id
  //   })[0]
  //   console.log(productThatHasAdd)
  //   if (!productThatHasAdd) {
  //     product.hasAddNumber = 1
  //     supermarketCart.push(product)
  //   } else {
  //     console.log(3)
  //     Vue.set(
  //       productThatHasAdd,
  //       "hasAddNumber",
  //       productThatHasAdd.hasAddNumber + 1
  //     )
  //   }
  // },
  updateProducts(state, products) {
    const { supermarketCart } = state
    products.forEach((product, index) => {
      if (supermarketCart.length == 0) {
        product.hasAddNumber = 0
        Vue.set(supermarketCart, 0, product)
      } else {
        supermarketCart.forEach((item, index) => {
          if (item.id == product.id) {
            product.hasAddNumber = item.hasAddNumber
            Vue.set(supermarketCart, index, product)
          }
        })
      }
    })
  },
  setShowSupermarketCartDetail(state, show) {
    state.show.showSupermarketCartDetail = show
  },
  addToSupermarketCart(state, product) {
    const { supermarketCart } = state
    const hasAddProduct = supermarketCart.filter(item => {
      return item.id == product.id
    })[0]
    if (hasAddProduct) {
      product.hasAddNumber++
      hasAddProduct.hasAddNumber = product.hasAddNumber
    } else {
      product.hasAddNumber = 1
      state.supermarketCart.push(product)
    }
  },
  clearSupermarketCart(state) {
    state.supermarketCart.forEach(item => (item.hasAddNumber = 0))
  },
  clearSearchName(state) {
    // console.log(1111111111)
    state.search.name = ""
  },
  clearSearchName1(state) {
    state.search.name1 = ""
  }
}
export default mutations
