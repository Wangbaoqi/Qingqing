import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "@/interface/user";

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
export default userSlice.reducer;
