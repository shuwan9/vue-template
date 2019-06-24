import Vue from "vue"
import { Toast } from "mand-mobile"
import App from "@/main"
import { getToken } from "./config"
import instance from "./instance"

const send = opts => {
  return new Promise((resolve, reject) => {
    instance.defaults.headers.token = getToken()
    instance(opts)
      .then(res => {
        const { code, data, message } = res.data
        if (code == 0) {
          resolve(res)
        } else if (code == 405) {
          Toast.info(message, 1500)
          setTimeout(() => {
            App.$router.push("/login")
          })
        } else {
          Toast.info(message, 1500)
        }
      })
      .catch(err => {
        console.log(err)
        const { fail } = opts
        if (fail) {
          fail()
        } else {
          Toast.failed("连接服务器失败，请稍后再试", 1500)
        }
      })
  })
}

const $http = {
  login(data) {
    return send({
      url: "user/login",
      method: "post",
      data
    })
  },
  order: {
    createOrder(data) {
      return send({
        url: "varietyOfDishes/placeAnOrder",
        method: "post",
        data
      })
    },
    list(data) {
      return send({ url: `varietyOfDishes/order/list`, method: "post", data })
    }
  },
  getDishTypes() {
    return send({ url: "/Dists/dishType" })
  },
  getMeals(key, pageSize, pageCurrent) {
    const data = {
      content: JSON.stringify({
        dishType: key
      }),
      pageCurrent,
      pageSize
    }
    return send({ url: "/varietyOfDishes/list", method: "post", data })
  }
}

export default $http
