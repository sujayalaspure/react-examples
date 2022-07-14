import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarParking from "./CarParking";
import Calculator from "./Calculator";
import "./styles.css";
const Home = React.lazy(() => import("./home"));
const Weather = React.lazy(() => import("./Weather"));
const Chessboard = React.lazy(() => import("./chessboard"));
const NestedComments = React.lazy(() => import("./nested-comments"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={"Loading ..."}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/parking" element={<CarParking />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/chessboard" element={<Chessboard />} />
          <Route path="/nested-comments" element={<NestedComments />} />
        </Routes>
      </Suspense>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

// UI
//  select the car - small, medium, large
//  entry time
