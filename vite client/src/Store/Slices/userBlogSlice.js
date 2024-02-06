import { createSlice } from "@reduxjs/toolkit";

const userBlogSlice = createSlice({
  name: "userBlog",
  initialState: {
    userBlogs: localStorage.getItem("userBlogs")
      ? JSON.parse(localStorage.getItem("userBlogs"))
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
      localStorage.setItem("userBlogs", JSON.stringify(action.payload));
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
