import Taro from "@tarojs/taro";
import { wxUserLogin } from '@/service/auth';
import { IWxUser, ILoginResponse } from '@/interface/user';



export const checkSession = () => {
  return new Promise((resolve, reject) => {
    Taro.checkSession({
      success: function () {
        resolve(true)
      },
      fail: function () {
        reject(false)
      }
    })
  })
}

export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}


export const login = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return wxLogin().then((res: ILoginResponse) => {
      wxUserLogin({
        code: res.code,
      }).then((user: IWxUser) => {
        Taro.setStorageSync('openId', user.openId);
        Taro.setStorageSync('token', user.token);
        resolve(true);
      }).catch(err => {
        console.log(err, '登录失败');
        reject(false);
      });
    });
  })
}


export const checkLogin = () => {
  return new Promise((resolve) => {
    if (Taro.getStorageSync('openId') && Taro.getStorageSync('token')) {
      resolve(true);
    } else {
      resolve(false);
    }
  })
}


