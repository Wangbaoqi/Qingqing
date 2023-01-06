import Taro from "@tarojs/taro";
import Api from "@/config/api";

import { login } from "./user";

interface Options {
  url: string;
  data?: object;
}

let isRefreshToken = false;
let subscribers: Function[] = [];

function interceptor(chain: Taro.Chain) {
  const requestParams = chain.requestParams;
  // const { method, data, url } = requestParams;
  return chain
    .proceed(requestParams)
    .then(res => {
      return checkStatus(res, requestParams)
    })
    .catch(err => err)
}

Taro.addInterceptor(interceptor);

function request(options: Taro.request.Option = { url: "" }) {
  const Token = Taro.getStorageSync("token");
  options = {
    ...options,
    timeout: options.timeout || 10000,
    header: {
      Authorization: `${Token ? `Bearer ${Token}` : ""}`
    },
    data: options.data || {},
    responseType: "text",
    dataType: "json",
    method: options.method || "GET"
  };

  return Taro.request({
    ...options
  })
}

function checkStatus(response, requestParams) {
  const { data = {}, statusCode = 200, errMsg = "" } = response;

  console.log("checkStatus", data, requestParams.url);

  if (statusCode === 200) {
    // token lose effectiveness
    if (data.errCode === "401") {
      if (!isRefreshToken) {
        isRefreshToken = true;
        return login().then(() => {
          executeSubscribers();
          isRefreshToken = true;
          return request(requestParams)
        });
      }
      return new Promise(resolve => {
        addSubscriber(() => {
          resolve(request(requestParams));
        });
      });
    } else if (!data.data) {
      return Promise.reject(data.errMessage)
    } else {
      return data.data;
    }
  } else {
    return errMsg;
  }
}

function executeSubscribers() {
  subscribers.forEach(subscriber => {
    subscriber();
  });
  subscribers = [];
}

function addSubscriber(cb) {
  subscribers.push(cb);
}

request.get = (url: string, data?: object) => {
  return request({ url, data, method: "GET" });
};

request.post = (url: string, data?: object) => {
  return request({ url, data, method: "POST" });
};

export default request;
