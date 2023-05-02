import React from "react";
import { Routes, Route } from "react-router-dom";
import ZimmerStatus from "./pages/ZimmerStatus";
import Navbar from "./components/Navbar";
import Room from "./components/Room";

function App() {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<ZimmerStatus />} />
        <Route path="/zimmer/:raumnummer" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
