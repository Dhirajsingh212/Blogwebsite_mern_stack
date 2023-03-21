import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { ParallaxProvider } from "react-scroll-parallax";
import { ContextProvider } from "./Context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ParallaxProvider>
  // {/* <React.StrictMode> */}
  <ContextProvider>
    <App />
  </ContextProvider>
  // </React.StrictMode>
  // </ParallaxProvider>
);
