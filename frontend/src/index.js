import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Map />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
