import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "@/interface/user";
import { wxGetStudent } from '@/service/auth';

const initialState = {
  userInfo: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload
    }
  }
})

export const { setUserInfo } = userSlice.actions;

export const getUserInfoAsync = () => (dispatch) => {
  wxGetStudent().then(res => {
    console.log(res, 'slice user info');
    dispatch(setUserInfo(res))
  })
}

export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
