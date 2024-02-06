import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    isFetching: false,
    isError: false,
  },
  reducers: {
    authStart(state, action) {
      state.isFetching = true;
    },
    authSuccess(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.isFetching = false;
      state.isError = false;
    },
    authFail(state, action) {
      state.isFetching = false;
      state.isError = true;
    },
    logout(state, action) {
      state.token = null;
      localStorage.setItem("token", null);
      localStorage.setItem("userBlogs", JSON.stringify([]));
    },
  },
});

export default userSlice;
