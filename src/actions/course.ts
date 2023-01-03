import { SET_COURSE_INFO } from '@/constants/course'

export const setCourseInfo = (course) => {
  return {
    type: SET_COURSE_INFO,
    payload: course
  }
}


// 异步的 action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      // dispatch(add())
    }, 2000)
  }
}

