import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./animation.css";
import { ParamsProvider } from "./context/ParamsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ParamsProvider>
        <App />
      </ParamsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
