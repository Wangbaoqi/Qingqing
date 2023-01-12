import Api from '@/config/api';
import request from '@/utils/request/http';

export const getTest = () => {
  return request.get(Api.testApi)
}

export const getCourseList = () => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentCourses)
      .then(res => {
        const { data, success } = res;
        if (success && data) {
          resolve(data)
        } else {
          resolve([])
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getCourseDetail = (courseId: string) => {
  return new Promise((resolve, reject) => {
    request.get(`${Api.getStudentCourseDetail}/${courseId}`)
      .then(res => {
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

export const getTaskList = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentTasks, params)
      .then(res => {
        const { data, success } = res;
        if (success && data) {
          resolve(data)
        } else {
          resolve([])
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getTaskDetail = (taskId: string) => {
  return new Promise((resolve, reject) => {
    request.get(`${Api.getStudentTaskDetail}/${taskId}`)
      .then(res => {
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

export const getEvaluation = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentEvaluation, params)
      .then(res => {
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

// 提交评价
export const submitEvaluation = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.post(Api.submitStudentEvaluation, params)
      .then(res => {
        const { success } = res;
        resolve(success)
      })
      .catch(err => {
        reject(err)
      })
  })
}


