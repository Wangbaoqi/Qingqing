import request from '@/utils/request/http';
import Api from '@/config/api';
import Taro from '@tarojs/taro';
import { IResponse } from '@/interface/response';



// 上传任务资源
export const uploadMissMedia = (filePath): Promise<IResponse> => {

  return new Promise((resolve, reject) => {
    const Token = Taro.getStorageSync("token");
    Taro.uploadFile({
      url: Api.uploadFile,
      filePath,
      name: 'file',
      header: {
        Authorization: `${Token ? `Bearer ${Token}` : ""}`,
      },
      success(res) {
        console.log(res, 'complete success');
        const { data = ''} = res;
        resolve(JSON.parse(data))
      },
      fail(res) {
        console.log(res, 'complete fail');
      },
      complete(res) {
        console.log(res, 'complete upload');
      },
    })
  })
}

// 删除任务资源
export const deleteMissMedia = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.post(Api.deleteFile, params)
      .then(res => {
        const { success } = res;
        resolve(success)
      })
      .catch(err => {
        reject(err)
      })
  })
}
