import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    userId: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
