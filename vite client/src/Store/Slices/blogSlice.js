import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: sessionStorage.getItem("blogs")
      ? JSON.parse(sessionStorage.getItem("blogs"))
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
      sessionStorage.setItem("blogs", JSON.stringify(action.payload));
      state.isFetching = false;
      state.isError = false;
    },
    fetchBlogFail(state, action) {
      state.isFetching = false;
      state.isError = true;
    },
    searchBlogs(state, action) {
      if (action.payload.term.length <= 0) {
        state.blogs = sessionStorage.getItem("blogs")
          ? JSON.parse(sessionStorage.getItem("blogs"))
          : [];
      } else {
        const blogsData = sessionStorage.getItem("blogs")
          ? JSON.parse(sessionStorage.getItem("blogs"))
          : [];
        state.blogs = blogsData.filter((item) => {
          return item.title
            .toLowerCase()
            .includes(action.payload.term.trim().toLowerCase());
        });
      }
    },
    resetSearchBlogs(state, action) {
      state.blogs = sessionStorage.getItem("blogs")
        ? JSON.parse(sessionStorage.getItem("blogs"))
        : [];
    },
  },
});

export default blogSlice;
