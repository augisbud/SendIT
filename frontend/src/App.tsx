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
import { useToken } from './utils/Cache';

export const App = () => {
  const { token } = useToken();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://localhost:8080/ws",
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (token && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        __TYPE__: "subscribe",
        token: token,
      });
    }
  }, [token, readyState, sendJsonMessage]);

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