import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import blogSlice from "./Slices/blogSlice";
import userBlogSlice from "./Slices/userBlogSlice";

export const userActions = userSlice.actions;
export const blogActions = blogSlice.actions;
export const userBlogActions = userBlogSlice.actions;

const userReducer = userSlice.reducer;
const blogReducer = blogSlice.reducer;
const userBlogReducer = userBlogSlice.reducer;

export const store = configureStore({
  reducer: { userReducer, blogReducer, userBlogReducer },
});
