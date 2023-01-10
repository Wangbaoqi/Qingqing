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
        // Authorization: `${Token ? `Bearer ${Token}` : ""}`,
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOjEwMDA1LCJzdWIiOiJhZG1pbiIsInJvbGUiOiJbe1wiaWRcIjpcIjEwMDAwXCIsXCJwZXJtaXNzaW9uc1wiOlt7XCJpZFwiOlwiMTAwMDBcIixcInBlcm1pc3Npb25Db2RlXCI6XCIqOio6KlwiLFwicm9sZUlkXCI6XCIxMDAwMFwifV0sXCJyZWFsbVByaW1hcnlJZFwiOlwiMFwiLFwicmVhbG1UeXBlXCI6XCJDT01QQU5ZXCIsXCJyZWZJZFwiOlwiMTAwMDRcIixcInJvbGVDb2RlXCI6XCJzdXBlcl9hZG1pblwiLFwicm9sZU5hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwic3RhdHVzXCI6XCJOT1JNQUxcIn1dIiwiY3JlYXRlZCI6MTY3MzMzNzExNTI4NCwiZXhwIjoxNjczNDIzNTE1fQ.HuRbAcnNRtpYnfZ9J5T2ZSXXncrEMMnn1h7i3s8FFL9Cp3fNgB81swcW99qZFqp3-HapAwuSlR2p7p4V1E_gag',
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
