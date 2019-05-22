import qs from "qs";

import { type } from "../util/index";

const { isFile } = type;

const baseURL = "https://httpbin.org";

const transformRequest = data => {
  return isFile(data) ? data : qs.stringify(data);
};

const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

export { baseURL, transformRequest, headers };
