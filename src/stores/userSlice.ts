import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userId: -1,
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
