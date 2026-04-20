import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Set theme before paint
(function() {
  const d = document.documentElement;
  const saved = null; // no localStorage on first load - use system pref
  const pref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  d.setAttribute("data-theme", pref);
})();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);