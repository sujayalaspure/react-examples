import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarParking from "./CarParking";
import Calculator from "./Calculator";
import "./styles.css";
import Home from "./home";
import Weather from "./Weather";
import Chessboard from "./chessboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/parking" element={<CarParking />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/chessboard" element={<Chessboard />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

// UI
//  select the car - small, medium, large
//  entry time
