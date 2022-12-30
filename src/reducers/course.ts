import { ADD, MINUS } from '@/constants/course'

const INITIAL_STATE = {
  num: 0,
}

export default function course(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      }
    default:
      return state
  }
}
