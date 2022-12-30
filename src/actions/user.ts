import { SET_USERINFO } from "@/constants/user";

import { wxLinkStudents } from "@/service/auth";
import { IUser } from "@/interface/user";

export const fetchStudents = () => {

  return dispatch => {
    wxLinkStudents().then((students: IUser[]) => {
      if (students.length) {
        dispatch({
          type: SET_USERINFO,
          payload: students[0]
        })
      }
    })
  }
}
