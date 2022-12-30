import Taro from "@tarojs/taro";
import { wxUserLogin } from '@/service/auth';


/**
 * SingleResponse«微信用户信息»
 */
export interface LoginResponse {
  code?: string;
  errMsg?: string;
}

/**
* 微信用户信息
*/
export interface UserInfo {
  /**
   * openId
   */
  openId?: string;
  /**
   * Token串
   */
  token?: string;
}

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


export const login = () => {
  return new Promise((resolve, reject) => {
    return wxLogin().then((res: LoginResponse) => {
      wxUserLogin({
        code: res.code,
      }).then((user: UserInfo) => {
        Taro.setStorageSync('openId', user.openId)
        Taro.setStorageSync('token', user.token)
        resolve(true)
      }).catch(err => {
        console.log(err, '登录失败');
        reject(false)
      })
    })
  })
}


export const checkLogin = () => {
  return new Promise((resolve, reject) => {
    if (Taro.getStorageSync('openId') && Taro.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      resolve(false);
    }
  })
}


