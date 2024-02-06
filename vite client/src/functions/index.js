import axios from "axios";
export const base_url = "http://localhost:8000/";

//USER ROUTES
export const loginFunction = (username, password) => {
  const res = axios.post(`${base_url}login`, {
    username,
    password,
  });
  return res;
};

export const signupFunction = (email, usrname, passwrd, cnfpasswrd) => {
  const res = axios.post(`${base_url}signup`, {
    email: email,
    username: usrname,
    password: passwrd,
    passwordConfirm: cnfpasswrd,
  });
  return res;
};

export const getUser = (token) => {
  const res = axios.get(`${base_url}user/getdata`, {
    headers: {
      token,
    },
  });
  return res;
};

export const updateUser = (email, username, previewSource, token) => {
  const res = axios.patch(
    `${base_url}user/update`,
    { email, username, previewSource },
    {
      headers: { token },
    }
  );
  return res;
};

export const deleteUser = (token) => {
  const res = axios.delete(`${base_url}user/delete`, {
    headers: { token },
  });
  return res;
};

export const logoutUser = (token) => {
  const res = axios.get(`${base_url}user/logout`, {
    headers: { token },
  });
  return res;
};

//BLOG ROUTES
export const getAllBlogs = (data) => {
  const res = axios.get(`${base_url}getallBlogs`, {
    headers: {
      data,
    },
  });
  return res;
};

export const getUserBlogs = (data) => {
  const res = axios.get(`${base_url}getBlogs`, {
    headers: {
      data,
    },
  });
  return res;
};

export const getSingleBlog = (params) => {
  const res = axios.get(`${base_url}${params}`, {
    headers: { params },
  });
  return res;
};

export const createNewBlog = (data, title, descrip, previewSource) => {
  const res = axios.post(
    `${base_url}newBlogs`,
    { title, descrip, previewSource },
    {
      headers: { data },
    }
  );
  return res;
};

export const editBlog = (params, token) => {
  const res = axios.get(`${base_url}editblogs`, {
    headers: {
      params,
      token,
    },
  });
  return res;
};

export const updateBlog = (
  title,
  description,
  previewSource,
  token,
  params
) => {
  const res = axios.patch(
    `${base_url}updateblogs`,
    { title, description, previewSource },
    {
      headers: {
        token,
        params,
      },
    }
  );
  return res;
};
