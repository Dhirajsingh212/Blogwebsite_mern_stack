import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Blog from "../components/Blog/Blog";
import Footer from "../components/Footer/Footer";
import "./Main.css";
import { getAllBlogs } from "../functions";
import { Context } from "../Context/Context";

export default function Main() {
  const { token } = useContext(Context);

  const [classStyle, setclassStyle] = useState({
    position: "absolute",
  });

  useEffect(() => {
    let data = token;
    getAllBlogs(data)
      .then((res) => {
        if (res.data && res.data.data.length > 0) {
          setclassStyle({ position: "relative" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="Main">
        <Navbar />
        <Header />
        <Blog />
        <div className="Main_footer" style={classStyle}>
          <Footer />
        </div>
      </div>
    </>
  );
}
