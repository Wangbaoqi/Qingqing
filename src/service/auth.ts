import Api from '@/config/api';
import request from '@/utils/request/http';
import Taro from '@tarojs/taro';

export const wxUserLogin = (data) => {
  return request.post(Api.userWxLogin, data)
}

export const wxGetStudent = () => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentList)
      .then((res) => {
        console.log(res, 'Student List');
        Taro.setStorageSync('userList', res)
        Taro.setStorageSync('currentUser', res[0] || null)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}

export const wxBindStudent = (data) => {
  return request.post(Api.bindStudent, {
    ...data,
    openId: Taro.getStorageSync('openId')
  })
}

export const wxUnBindStudent = (data) => {
  return request.post(Api.unBindStudent, {
    ...data,
    openId: Taro.getStorageSync('openId')
  })
}
