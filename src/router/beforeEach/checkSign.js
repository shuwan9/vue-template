import { ls } from '../../plugins/ls'

const toLogin = (signed, next) => {
  if (signed) {
    const to = ls.get('to')
    next({
      path: to && to.path && to.path != '/' ? to.path : '/vegetable/list'
    })
  } else {
    next()
  }
}
const toOther = (to, signed, next) => {
  if (signed) {
    next()
  } else {
    ls.set('to', to)
    next({ path: '/login' })
  }
}

const checkSign = (to, from, next) => {
  let signed = ls.get('signed')
  if (to.path === '/login') {
    toLogin(signed, next)
  } else {
    toOther(to, signed, next)
  }
}

export default checkSign
