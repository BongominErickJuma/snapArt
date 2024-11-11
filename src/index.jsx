import React from "react";
import ReactDOM from "react-dom/client";

// Bootstrap styles & JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// font;

import "@fontsource/league-spartan"; // Defaults to weight 400
import "@fontsource/edu-vic-wa-nt-beginner"; // Defaults to weight 400
import "@fontsource/montserrat"; // Defaults to weight 400

// CSS styles
import "./index.css";

// Main JSX

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
