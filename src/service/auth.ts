import Api from '@/config/api';

import request from '@/utils/request/http';
import Taro from '@tarojs/taro';
import { IUser } from "@/interface/user";

export const wxUserLogin = (data) => {
  return request.post(Api.userWxLogin, data)
}

export const wxGetStudent = (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentList)
      .then((res: IUser[]) => {
        Taro.setStorageSync('userList', res)
        Taro.setStorageSync('currentUser', res[0])
        resolve(res[0]??null)
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
