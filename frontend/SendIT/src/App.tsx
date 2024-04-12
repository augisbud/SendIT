import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home/page";
import { Login } from "./pages/login/login"


export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      {/* Add here new routes */}
      <Route path="/login" element={<Login />}/>
    </Routes>
  </BrowserRouter>
);
