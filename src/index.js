import React from "react";
import ReactDOM from "react-dom";
import { Curtains } from "react-curtains";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Curtains pixelRatio={Math.min(1.5, window.devicePixelRatio)}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Curtains>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
