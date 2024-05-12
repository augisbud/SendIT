import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

type MessageData = {
    [key: string]: any;
};

export const WSExample: React.FC = () => {
    const queryParams = useSearchParams()[0];
    const [log, setLog] = useState<string>("");

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        "ws://localhost:8080/ws",
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
          sendJsonMessage({
            __TYPE__: "subscribe",
            token: btoa(queryParams.get("username") + ":" + queryParams.get("password")),
          });
        }
      }, [readyState, sendJsonMessage]);

    const logMessage = (text: string) => {
        setLog((prevLog) => prevLog + text + "\n");
    };

    useEffect(() => {
        if (lastJsonMessage) {
            logMessage("got message: " + JSON.stringify(lastJsonMessage));
        }
    }, [lastJsonMessage]);

    const handleClick = () => {
        if (readyState === ReadyState.OPEN) {
            const messageObject: MessageData = {
                __TYPE__: "message",
                token: btoa(queryParams.get("username") + ":" + queryParams.get("password")),
                message: (document.getElementById("message") as HTMLInputElement).value,
                recipientId: parseInt((document.getElementById("recipientId") as HTMLInputElement).value)
            };
            sendJsonMessage(messageObject);
        } else {
            console.error("WebSocket connection not open.");
        }
    };

    return (
        <div>
            <input type="number" id="recipientId" defaultValue="Hello, World!" />
            <input type="text" id="message" defaultValue="Hello, World!" />
            <button id="send" onClick={handleClick}>
                Send Message
            </button>
            <pre>{log}</pre>
        </div>
    );
};