import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BalanceSheet } from "./pages/balancesheet";
import { Auth } from "./pages/auth/index";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} exact />
          <Route path="balance-sheet" element={<BalanceSheet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
