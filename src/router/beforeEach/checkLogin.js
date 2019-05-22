import { ls } from '../../plugins/ls'
const checkLogin = (to, from, next) => {
  let hasLogin = ls.get('hasLogin')
  if (to.path === '/login') {
    if (hasLogin) {
      next({
        path: 'main'
      })
    } else {
      next()
    }
  } else {
    if (hasLogin) {
      next()
    } else {
      ls.set('toPath', to.path)
      next({ path: '/login' })
    }
  }
}

export default checkLogin
