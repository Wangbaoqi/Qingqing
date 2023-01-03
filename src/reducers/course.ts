import { SET_COURSE_INFO } from '@/constants/course'

const INITIAL_STATE = {
  authorName: '',
  backgroundImageFileUrl: '',
  classification: '',
  companySrcId: 0,
  description: '',
  duration: 0,
  id: 0,
  name: '',
  origin: '',
  period: '',
  scene: '',
  tag: '',
  type: '',
}

export default function course(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_COURSE_INFO:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
