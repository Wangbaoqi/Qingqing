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
      state.userInfo = action.payload
    },
    setUserList: (state, action) => {
      state.status = 'idle';
      state.userList = action.payload
    },
    saveUserLoading: (state) => {
      state.status = 'loading'
    },
    saveUserIdle: (state) => {
      state.status = 'idle'
    },
  }
})

export const { setUserInfo, setUserList, saveUserLoading, saveUserIdle } = userSlice.actions;

export const getUserInfoAsync = () => (dispatch, getState) => {
  dispatch(saveUserLoading())
  wxGetStudent()
    .then((users: IUser[]) => {
      console.log(users, 'users slices');
      const { userInfo = null } = getState().user;
      dispatch(setUserList(users))
      if (!userInfo && users.length) {
        dispatch(setUserInfo(users[0]))
      }
    })
    .catch(err => {
      console.log(err, 'getUserInfoAsync error');
    }).finally(() => {
      dispatch(saveUserIdle())
    })
}

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserList = (state) => state.user.userList;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
