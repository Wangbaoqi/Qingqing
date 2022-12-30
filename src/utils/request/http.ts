import Taro from "@tarojs/taro"

interface Options {
  url: string,
  data?: object
}

function request(options:Taro.request.Option = {url: ''}) {

  options = {
    ...options,
    timeout: options.timeout || 10000,
    header: {
      Authorization: `Bearer ${Taro.getStorageSync('token')}`
    },
    data: options.data || {},
    responseType: 'text',
    dataType: 'json',
    method: options.method || 'GET'
  }

  return new Promise((resolve, reject) => {

    Taro.request({
      ...options
    })
      .then(res => {
        if (res.statusCode === 200) {
          if (res.data.success && res.data.data) {
            resolve(res.data.data)
          } else {
            reject(res.data.errMessage)
          }
        } else {
          reject(res.errMsg)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

request.get = (url, data?: object) => {
  return request({url, data, method: 'GET'})
}

request.post = (url, data?: object) => {
  return request({url, data, method: 'POST'})
}

export default request
