import { SET_USERINFO } from "@/constants/user";
import { IUser } from "@/interface/user";

const INITIAL_STATE: IUser = {
  avatarId: 0,
  avatarUrl: '',
  birthday: new Date(),
  className: '',
  gender: '',
  id: 0,
  parentPhoneNum: '',
  studentCode: '',
  studentName: '',
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USERINFO: {
      const { userInfo } = action.payload;
      return { ...state, ...userInfo}
    }
    default:
      return state
  }
}
