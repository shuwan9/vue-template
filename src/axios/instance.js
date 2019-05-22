import axios from "axios";

import { baseURL, headers, transformRequest } from "./config";

const instance = axios.create({
  baseURL,
  headers,
  transformRequest: [transformRequest]
});

export default instance;
