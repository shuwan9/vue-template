const setTitile = (to, from, next) => {
  const { title } = to.meta
  document.title = `预定系统${title ? '-' + title : ''}`
  next()
}

export default setTitile
