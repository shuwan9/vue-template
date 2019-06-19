const _default = {
  path: "/",
  redirect: "/login"
}

const Login = {
  path: "/login",
  component: () => import("@/views/Login")
}

const Home = {
  path: "/home",
  component: () => import("@/views/Home")
}
const Order = {
  path: "/order",
  component: () => import("@/views/Order"),
  children: [
    {
      path: "dish",
      component: () => import("@/views/Dish")
    },
    {
      path: "list",
      component: () => import("@/views/List")
    }
  ]
}

export default [_default, Login, Home, Order]
