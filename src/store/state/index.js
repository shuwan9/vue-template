const login = {
  username: "shuwang",
  mobile: "18762750392",
  captcha: "123456"
}

const dishTypes = [
  {
    label: "熟食",
    key: "1"
  },
  {
    label: "净菜",
    key: "2"
  },
  {
    label: "农产品",
    key: "3"
  },
  {
    label: "生日蛋糕",
    key: "4"
  }
]

const carts = dishTypes.map(item => {
  item.meals = []
  return item
})

const dishType = {
  label: "熟食",
  key: "1"
}
const show = {
  showCartDetail: false
}

export default {
  login,
  carts,
  dishType,
  dishTypes,
  show
}
