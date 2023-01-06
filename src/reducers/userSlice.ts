import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "@/interface/user";
import { wxGetStudent } from '@/service/auth';

const initialState: IUser = {
  userInfo: null,
  userList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setUserList: (state, action) => {
      state.userList = action.payload
    }
  }
})

export const { setUserInfo, setUserList } = userSlice.actions;

export const getUserInfoAsync = () => (dispatch, getState) => {
  wxGetStudent()
    .then((users: IUser[])  => {
      console.log(users, 'wxGetStudent');

      const { userInfo = null } = getState().user;
      dispatch(setUserList(users))
      if (!userInfo && users.length) {
        dispatch(setUserInfo(users[0]))
      }
    })
    .catch(err => {
      console.log(err, 'getUserInfoAsync error');
    })
}

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserList = (state) => state.user.userList;

export default userSlice.reducer;
