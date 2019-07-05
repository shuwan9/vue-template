import timeStamp from "time-stamp"
const getDate = value => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)

  const hour = ("0" + date.getHours()).slice(-2)
  const minute = ("0" + date.getMinutes()).slice(-2)
  return `${year}-${month}-${day} ${hour}:${minute}`
}
const getDate2 = value => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = date.getDate()
  return `${year}-${month}-${day}`
}
const filters = {
  timeStamp(value) {
    if (!value) {
      return ""
    }
    // return timeStamp("YYYY-MM-DD HH:ss", new Date(value))
    return getDate(value)
  },
  timeStamp2(value) {
    if (!value) {
      return ""
    }
    // return timeStamp("YYYY-MM-DD HH:ss", new Date(value))
    return getDate2(value)
  }
}
export default filters
