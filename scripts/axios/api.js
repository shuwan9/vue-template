const apis = [
  {
    module: "_default",
    description: "",
    apis: [
      {
        name: "sign",
        url: "/sign",
        description: "登录",
        method: "post"
      },
      {
        url: "/",
        description: "",
        name: "sendCode",
        method: "post"
      }
    ]
  },
  {
    module: "spm",
    description: "",
    apis: [
      {
        name: "getOrders",
        url: "/list/get",
        method: "get"
      },
      {
        name: "test",
        method: "put"
      }
    ]
  }
]
module.exports = apis
