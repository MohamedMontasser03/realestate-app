import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GridProvider } from "./context/GridContext";

ReactDOM.render(
  <React.StrictMode>
    <GridProvider>
      <App />
    </GridProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
