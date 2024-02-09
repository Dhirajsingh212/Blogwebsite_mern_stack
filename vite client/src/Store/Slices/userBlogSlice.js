import { createSlice } from "@reduxjs/toolkit";

const userBlogSlice = createSlice({
  name: "userBlog",
  initialState: {
    userBlogs: sessionStorage.getItem("userBlogs")
      ? JSON.parse(sessionStorage.getItem("userBlogs"))
      : [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    fetchUserBlogStart(state, action) {
      state.isFetching = true;
    },
    fetchUserBlogSuccess(state, action) {
      state.userBlogs = action.payload;
      sessionStorage.setItem("userBlogs", JSON.stringify(action.payload));
      state.isFetching = false;
      state.isError = false;
    },
    fetchUserBlogFail(state, action) {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export default userBlogSlice;
