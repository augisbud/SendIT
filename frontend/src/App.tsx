import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import { SignUp } from './pages/SignUp/SignUp';
import { Chat } from './pages/Chat/Chat';
import { Settings } from './pages/Settings/Settings';

import "./globals.scss";
import { AddFriend } from './pages/AddFriend/AddFriend';
import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const App = () => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://sendit.zzzz.lt:5552/ws",
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (readyState === ReadyState.OPEN && authToken) {
      sendJsonMessage({
        __TYPE__: "subscribe",
        token: authToken,
      });
    }
  }, [readyState, sendJsonMessage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chats/:id" element={<Chat sendJsonMessage={sendJsonMessage} readyState={readyState} lastJsonMessage={lastJsonMessage}/>} />
        <Route path="/friends" element={<AddFriend />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}