
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoList from "./Pages/CryptoList";
import CryptoDetails from "./Pages/CryptoDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
