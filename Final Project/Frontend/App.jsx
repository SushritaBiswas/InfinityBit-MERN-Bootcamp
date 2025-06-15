import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LinkQr from "./components/LinkQr";
import GetQr from "./components/GetQr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/linkqr" element={<LinkQr />} />
          <Route path="/showqr" element={<GetQr />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
