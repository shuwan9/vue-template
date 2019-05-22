import { type } from '../../util'

const { getType } = type

let installed = false

const get = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return localStorage.getItem(key)
  }
}

const set = (key, value) => {
  if (getType(key) === 'string') {
    localStorage.setItem(
      key,
      getType(value) === 'object' ? JSON.stringify(value) : value
    )
    return true
  }
  return false
}

const install = (Vue, options) => {
  if (installed) {
    return
  }
  installed = true
  Vue.prototype.$ls = {
    get,
    set
  }
}

export default { install }
