import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Blog from "../components/Blog/Blog";
import Footer from "../components/Footer/Footer";
// import "./Main.css";
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

  //TO BE FIXED THE FOOTER AT THE BOTTOM OF THE PAGE
  let digit = -screen.height;
  const styleFooter = {
    bottom: digit + "%",
  };

  return (
    <>
      <div className="min-h-96">
        <div className="min-h-64">
          <Navbar />
          <Header />
          <Blog />
        </div>
        <div className="absolute w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
