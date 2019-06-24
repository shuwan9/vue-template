import Ls from "@/plugins/LocalStorage"
import Router from "vue-router"
import routes from "./routes"

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const toPath = to.path
  const user = Ls.get("user")
  if (toPath == "/login") {
    next()
  } else {
    Ls.set("toPath", toPath)
    if (user) {
      next()
    } else {
      next({ path: "/login" })
    }
  }
})

export default router
