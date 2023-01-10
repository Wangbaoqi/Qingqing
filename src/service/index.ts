import Api from '@/config/api';
import request from '@/utils/request/http';

import { ITaskDetail } from './../interface/task.d';
import { IResponse } from '@/interface/response';
import { ICourseDetail } from '@/interface/course';

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
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getCourseDetail = (taskId: string) => {
  return new Promise((resolve, reject) => {
    request.get(`${Api.getStudentTaskDetail}/${taskId}`)
      .then(res => {
        const { data, success } = res;
        if (success && data) {
          resolve(data)
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
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const getTaskDetail = (params = {}) => {
  return new Promise((resolve, reject) => {
    request.get(Api.getStudentTasks, params)
      .then(res => {
        const { data, success } = res;
        if (success && data) {
          resolve(data)
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
        const { data, success } = res;
        if (success && data) {
          resolve(data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}


