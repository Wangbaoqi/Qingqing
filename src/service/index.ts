import Api from '@/config/api';
import request from '@/utils/request/http';

export const getTest = () => {
  return request.get(Api.testApi)
}

export const getCourseList = () => {
  return request.get('https://www.fastmock.site/mock/5de1c2a1ac597ba6eeadef0fae7ef56b/qin/courseList')
  // return request.get(Api.getStudentCourses)
}

export const getTaskList = (data) => {
  return request.get('https://www.fastmock.site/mock/5de1c2a1ac597ba6eeadef0fae7ef56b/qin/taskList')
  // return request.get(Api.getStudentTasks, data)
}

export const getEvaluation = () => {
  return request.get(Api.getStudentEvaluation)
}


export const submitEvaluation = (data) => {
  return request.post(Api.submitStudentEvaluation, data)
}

export const validToken = () => {
  return request.get('https://www.fastmock.site/mock/5de1c2a1ac597ba6eeadef0fae7ef56b/qin/tokentest')
}


