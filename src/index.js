import React, { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <HashRouter basename="/x-course-task">
      <App />
    </HashRouter>
  </StrictMode>
);
