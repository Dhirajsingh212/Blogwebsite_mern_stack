import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Store/index.js";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#1e293b" highlightColor="#444">
    <Provider store={store}>
      <App />
    </Provider>
  </SkeletonTheme>
);
