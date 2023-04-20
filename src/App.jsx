import React from "react";
import { Routes, Route } from "react-router-dom";
import ZimmerStatus from "./pages/ZimmerStatus";
import Navbar from "./components/Navbar";
import ZimmerAuswahl from "./pages/ZimmerAuswahl";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<ZimmerStatus />} />
        <Route path="/zimmer" element={<ZimmerAuswahl />} />
      </Routes>
    </div>
  );
}

export default App;
