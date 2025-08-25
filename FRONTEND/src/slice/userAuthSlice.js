import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuth: false
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userAuth = true;
    },
    logout: (state, action) => {
      state.userAuth = false;
    },
  },
});

export const { login, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
