import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewReg from "./components/NewReg";
import "./style.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newreg" element={<NewReg />} />
        </Routes>
      </div>
    </>
  )
}

export default App
