const getType = value => {
  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase()
}
const isFalse = value => {
  return value === undefined || value === null || value === ''
}
const isTrue = value => {
  return !isFalse(value)
}
const isFile = value => {
  if (!value) {
    return false
  }
  return getType(value) === 'file'
}

export { getType, isFalse, isTrue, isFile }
