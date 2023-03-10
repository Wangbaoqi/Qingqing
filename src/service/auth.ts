import Api from '@/config/api';
import request from '@/utils/request/http';
import Taro from '@tarojs/taro';

export const wxUserLogin = (param = {}) => {
  return new Promise((resolve, reject) => {
    request.post(Api.userWxLogin, param)
      .then((res) => {
        const { data, success } = res;
        if (success && data) {
          resolve(data)
        } else {
          resolve({})
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const wxGetStudent = () => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentList)
      .then((res) => {
        const { data, success } = res;
        if (success && data) {
          Taro.setStorageSync('userList', data)
          Taro.setStorageSync('currentUser', data[0] || null)
          resolve(data)
        } else {
          resolve({})
        }
      }).catch(err => {
        reject(err)
      })
  })
}

export const wxBindStudent = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.post(Api.bindStudent, {
      ...params,
      openId: Taro.getStorageSync('openId')
    })
      .then(res => {
        const { data, success } = res;
        if (success && data) {
          resolve(success)
        } else {
          reject()
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const wxUnBindStudent = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.post(Api.unBindStudent, {
      ...params,
      openId: Taro.getStorageSync('openId')
    })
      .then(res => {
        const { success } = res;
        if (success) {
          resolve(success)
        } else {
          resolve(false)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
