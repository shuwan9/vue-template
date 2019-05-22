import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
import setTitle from './beforeEach/setTitle'
import checkLogin from './beforeEach/checkLogin'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach(setTitle)
router.beforeEach(checkLogin)

export default router
