import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Blog from "../components/Blog/Blog";
import Footer from "../components/Footer/Footer";

export default function Main() {
  return (
    <div>
      <Navbar />
      <Header />
      <div style={{"display":"flex","justify-content":"center"}}>
        <Blog/>
      </div>
      <Footer />
    </div>
  );
}
