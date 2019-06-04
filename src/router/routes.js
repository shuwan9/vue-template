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

export default [_default, Login, Home]
