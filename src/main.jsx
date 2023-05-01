import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./Context";
import ScrollToTop from "./ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ContextProvider>
      <React.StrictMode>
        <ScrollToTop />
        <App />
      </React.StrictMode>
    </ContextProvider>
  </Router>
);
