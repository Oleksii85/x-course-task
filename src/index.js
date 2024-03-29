import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { HashRouter } from "react-router-dom";
// import "./index.scss";
// import App from "./App";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </React.StrictMode>
// );
