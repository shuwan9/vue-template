import qs from "qs"

import Ls from "@/plugins/LocalStorage/index"

import { isFile } from "@/util/type"

const devBaseUrl = "http://192.168.4.228:8099/wx"

const prodBaseUrl = "http://121.40.195.52:8099/wx"

const baseURL = process.env.NODE_ENV == "development" ? devBaseUrl : prodBaseUrl

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
