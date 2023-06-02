import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'issignin',
  initialState: {
    signin:true
  },
  reducers: {
    isUser: (state) => {
      state.signin = !state.signin;
    }
  }
});

export const userAction = userSlice.actions;
export default userSlice;
