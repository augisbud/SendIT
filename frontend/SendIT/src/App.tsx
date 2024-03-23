import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type MessageData = {
  [key: string]: any;
};

export const App: React.FC = () => {
  const WS_URL = "ws://172.22.14.173:8080";
  const [log, setLog] = useState<string>("");

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  const logMessage = (text: string) => {
    setLog((prevLog) => prevLog + text + "\n");
  };

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        __MESSAGE__: "subscribe",
        channel: { a: "1", b: "2", c: "3" },
      });
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      logMessage("got message: " + JSON.stringify(lastJsonMessage));
    }
  }, [lastJsonMessage]);

  const sendMessage = (message: string, payload: MessageData) => {
    if (readyState === ReadyState.OPEN) {
      const messageObject: MessageData = {
        __MESSAGE__: message,
        ...payload,
      };
      sendJsonMessage(messageObject);
    } else {
      console.error("WebSocket connection not open.");
    }
  };

  const handleClick = () => {
    const messageInput = (document.getElementById("message") as HTMLInputElement)
      .value;
    const argsInput = JSON.parse(
      (document.getElementById("args") as HTMLInputElement).value
    );
    sendMessage(messageInput, argsInput);
  };

  return (
    <div>
      <input type="text" id="message" defaultValue="message" />
      <input
        type="text"
        id="args"
        defaultValue='{"a":1, "b":2, "c":3}'
      />
      <button id="send" onClick={handleClick}>
        Send Message
      </button>
      <pre>{log}</pre>
    </div>
  );
};
