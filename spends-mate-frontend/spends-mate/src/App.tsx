import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar     from "./components/NavBar";
import Dashboard  from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import UploadCSV  from "./pages/UploadCSV";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <NavBar />
        <Routes>
          <Route path="/"       element={<Dashboard />} />
          <Route path="/add"    element={<AddExpense />} />
          <Route path="/upload" element={<UploadCSV />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}