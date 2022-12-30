import Api from '@/config/api';

import request from '@/utils/request/http';
import Taro from '@tarojs/taro';

export const wxUserLogin = (data) => {
  return request.post(Api.userWxLogin, data)
}

export const wxLinkStudents = () => {
  return request.get(Api.getStudentList)
}


export const wxBindStudent = (data) => {
  return request.post(Api.bindStudent, {
    ...data,
    openId: Taro.getStorageSync('openId')
  })
}
