import qs from "qs"

import Ls from "@/plugins/LocalStorage/index"

import { isFile } from "@/util/type"

// const baseURL = "https://httpbin.org"
// const baseURL = "http://192.168.4.11:8099/wx"
const baseURL = "http://192.168.4.203:8099/wx"
// const baseURL = "http://192.168.4.7:8099/wx"

const getToken = () => {
  const user = Ls.get("user")
  return user ? user.token : ""
}

const transformRequest = data => {
  return isFile(data) ? data : qs.stringify(data)
}

const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}

export { baseURL, transformRequest, headers, getToken }
