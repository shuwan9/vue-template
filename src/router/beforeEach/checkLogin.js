import { ls } from '../../plugins/ls'

const checkSign = (to, from, next) => {
  let signed = ls.get('signed')
  if (to.path === '/login') {
    if (signed) {
      next({
        path: '/vegetable/list'
      })
    } else {
      next()
    }
  } else {
    if (signed) {
      next()
    } else {
      ls.set('to', to)
      next({ path: '/login' })
    }
  }
}

export default checkSign
