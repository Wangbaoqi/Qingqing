import Api from '@/config/api';
import request from '@/utils/request/http';
import { ICourse } from "@/interface/course";

export const getTest = () => {
  return request.get(Api.testApi)
}

export const getCourseList = () => {
  return request.get('https://www.fastmock.site/mock/5de1c2a1ac597ba6eeadef0fae7ef56b/qin/courseList')
}

export const getTaskList = () => {
  return request.get('https://www.fastmock.site/mock/5de1c2a1ac597ba6eeadef0fae7ef56b/qin/taskList')
}
