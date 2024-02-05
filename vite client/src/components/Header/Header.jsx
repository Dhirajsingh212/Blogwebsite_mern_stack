import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header_div" id="home">
        <h1 className="header_h1">where the creativity starts</h1>
        <img
          src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="header_img"
        />
      </div>
    </>
  );
}
