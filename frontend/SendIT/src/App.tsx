import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import { SignUp } from './pages/SignUp/SignUp';
import { Chat } from './pages/Chat/Chat';
import { Settings } from './pages/Settings/Settings';

import "./globals.scss";
import { AddFriend } from './pages/AddFriend/AddFriend';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat" element={<Chat />}/>
      <Route path="/add-friend" element={<AddFriend />}/>
      <Route path="/settings" element={<Settings />}/>
    </Routes>
  </BrowserRouter>
);