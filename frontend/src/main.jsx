import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AccessGate from "./components/accessGate";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccessGate>
      <App />
    </AccessGate>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
