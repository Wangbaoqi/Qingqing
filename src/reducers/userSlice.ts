import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "@/interface/user";
import { wxGetStudent } from '@/service/auth';

const initialState: IUser = {
  userInfo: null,
  userList: [],
  status: 'idle'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      if (state.userInfo) {
        state.status = 'idle';
      }
      state.userInfo = action.payload
    },
    setUserList: (state, action) => {
      state.userList = action.payload
    },
    saveUserLoading: (state) => {
      state.status = 'loading'
    }
  }
})

export const { setUserInfo, setUserList, saveUserLoading } = userSlice.actions;

export const getUserInfoAsync = () => (dispatch, getState) => {
  wxGetStudent()
    .then((users: IUser[]) => {
      console.log(users, 'users slices');
      const { userInfo = null } = getState().user;
      dispatch(setUserList(users))
      if (!userInfo && users.length) {
        dispatch(saveUserLoading())
        dispatch(setUserInfo(users[0]))
      }
    })
    .catch(err => {
      console.log(err, 'getUserInfoAsync error');
    })
}

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserList = (state) => state.user.userList;
export const selectUserStatus = (state) => state.course.status;

export default userSlice.reducer;
