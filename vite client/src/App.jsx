import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Myblogs from "./Pages/Myblogs/Myblogs";
import Createblogs from "./Pages/Createblogs/Createblogs";
import Editblogs from "./Pages/Editblogs/Editblogs";
import Oneblog from "./Pages/Oneblog/Oneblog";
import Profile from "./Pages/Profile/Profile";
import Layout from "./Layout/Layout";

export default function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout Children={<Main />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myblog" element={<Layout Children={<Myblogs />} />} />
            <Route
              path="/createblog"
              element={<Layout Children={<Createblogs />} />}
            />
            <Route
              path="/editblogs/:id"
              element={<Layout Children={<Editblogs />} />}
            />
            <Route path="/:id" element={<Layout Children={<Oneblog />} />} />
            <Route
              path="/profile"
              element={<Layout Children={<Profile />} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
