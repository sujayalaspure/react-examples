import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarParking from "./CarParking";
import Calculator from "./Calculator";
import "./styles.css";
import Footer from "./Components/footer";
import Home from "./home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/parking" element={<CarParking />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

// UI
//  select the car - small, medium, large
//  entry time
