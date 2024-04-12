import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home/page";


export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      {/* Add here new routes */}
    </Routes>
  </BrowserRouter>
);
