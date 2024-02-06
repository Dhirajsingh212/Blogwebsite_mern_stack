import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: localStorage.getItem("blogs")
      ? JSON.parse(localStorage.getItem("blogs"))
      : [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    fetchBlogStart(state, action) {
      state.isFetching = true;
    },
    fetchBlogSuccess(state, action) {
      state.blogs = action.payload;
      localStorage.setItem("blogs", JSON.stringify(action.payload));
      state.isFetching = false;
      state.isError = false;
    },
    fetchBlogFail(state, action) {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export default blogSlice;
