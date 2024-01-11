import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BalanceSheet } from "./pages/balancesheet";
import { Auth } from "./pages/auth/index";
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="balance-sheet" element={<BalanceSheet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
