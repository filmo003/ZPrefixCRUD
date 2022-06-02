import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Links from "./components/Links/Links";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div>
      <Header location={useLocation().pathname} />
      <Links />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
 }

export default App;