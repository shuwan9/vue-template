import { Toast } from "mand-mobile"
import App from "@/main"
import { getToken } from "./config"
import instance from "./instance"

const send = (opts, cb) => {
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
          cb && cb()
        }
      })
      .catch(err => {
        console.log(err)
        Toast.failed("连接服务器失败，请稍后再试", 1500)
        cb && cb()
      })
  })
}

const $http = {
  login(data, cb) {
    return send(
      {
        url: "user/login",
        method: "post",
        data
      },
      cb
    )
  },
  sendCode(data) {
    return send({
      url: "user/verification",
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
    },
    detail(id) {
      return send({ url: `varietyOfDishes/view/${id}` })
    },
    completeOrder(data) {
      return send({
        url: "varietyOfDishes/order/complete",
        method: "post",
        data
      })
    },
    prepareComplete(data) {
      return send({
        url: "varietyOfDishes/order/completion",
        method: "post",
        data
      })
    },
    confirmPay(data) {
      return send({
        url: "varietyOfDishes/order/payment",
        method: "post",
        data
      })
    }
  },
  car: {
    services() {
      return send({
        url: "carWash/service/list"
      })
    },
    addUserCar(data) {
      return send({
        url: "carWash/userCar/add",
        method: "post",
        data
      })
    },
    getUserCars(id) {
      return send({
        url: `carWash/userCar/list/${id}`
      })
    },
    createOrder(data) {
      return send({
        url: "carWash/sumbit",
        method: "post",
        data
      })
    },
    confirmOrder(data) {
      return send({
        // url: "carWash/confirmSubmit",
        url: "carWash/payment",
        method: "post",
        data
      })
    },
    completeOrder(data) {
      return send({
        url: "carWash/order/complete",
        method: "post",
        data
      })
    },
    locationList(data) {
      return send({
        url: "carWash/location/list",
        method: "post",
        data
      })
    },
    getOrders(data) {
      return send({
        url: "carWash/order/list",
        method: "post",
        data
      })
    },
    getDetail(data) {
      return send({
        url: 'carWash/order/viwe',
        method: 'post',
        data
      })
    },
    confirmPay(data) {
      return send({
        url: 'carWash/order/payment',
        method: 'post',
        data
      })
    }
  },
  supermarket: {
    getProducts(data) {
      return send({
        url: "/supermarket/commodity/list",
        method: "post",
        data
      })
    }
  },
  spm: {
    createOrder(data) {
      return send({
        url: "supermarket/commodity/placeAnOrder",
        method: "post",
        data
      })
    },
    getOrders(data) {
      return send({
        url: "supermarket/order/list",
        method: "post",
        data
      })
    },
    getOrderDetail(id) {
      return send({
        url: `supermarket/order/view/${id}`
      })
    },
    prepareComplete(data) {
      return send({
        url: 'supermarket/order/dCompletion',
        method: 'post',
        data
      })
    },
    confirmPay(data) {
      return send({
        url: 'supermarket/order/payment',
        method: "post",
        data
      })
    },
    completeOrder(data) {
      return send({
        url: "supermarket/order/complete",
        method: "post",
        data
      })
    }
  },
  getDishTypes() {
    return send({ url: "/Dists/dishType" })
  },
  getMeals(data) {
    return send({ url: "/varietyOfDishes/list", method: "post", data })
  }
}

export default $http
