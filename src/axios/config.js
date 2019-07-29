import qs from "qs";

import Ls from "@/plugins/LocalStorage/index";

import { isFile } from "@/util/type";

// const devBaseUrl = "http://192.168.4.228:8099/wx"
// const devBaseUrl = "http://121.40.195.52:8081/AutoEngine/wx"
// const devBaseUrl = "http://121.40.195.52:8098/wx";
const devBaseUrl = "http://wxyd.accessclient.cn/wx";
// const devBaseUrl = "http://192.168.1.132:8099/wx"

const prodBaseUrl = "http://wxyd.accessclient.cn/wx";
// const prodBaseUrl = "http://121.40.195.52:8081/AutoEngine/wx"

const baseURL =
  process.env.NODE_ENV == "development" ? devBaseUrl : prodBaseUrl;

const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDQSIG+mImWgLcLqcpOewhKsAOgClEU71st69UHd5xouLKuByafWouNC/3KvSYStiReYjrZjST475Z8cxJcUN7m8ranextkHgEcsl4K+vSJZh+yUh6qwL6N22XQopsJcmKE/UKVCVNBdMI0cFDMVsXgkSr3Y2G/xaujZZOqd24gQIDAQAB";

var encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);

const RSA = val => {
  return encrypt.encrypt(val);
};
const base64Encrypt = new base64();

const getToken = () => {
  const user = Ls.get("user");
  const token = user ? user.token : "";
  // console.log(token, RSA(token));
  return token ? base64Encrypt.encode(RSA(token)) : "";
};

const transformRequest = data => {
  if (data && data.content) {
    data.content = base64Encrypt.encode(data.content);
  }
  return isFile(data) ? data : qs.stringify(data);
};

const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

export { baseURL, transformRequest, headers, getToken, publicKey, RSA };
