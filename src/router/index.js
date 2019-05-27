import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

import setTitle from './beforeEach/setTitle'
import checkSign from './beforeEach/checkSign'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach(setTitle)
router.beforeEach(checkSign)

export default router
