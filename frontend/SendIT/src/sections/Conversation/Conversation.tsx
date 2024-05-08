import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { FriendInfo } from "../../components/FriendInfo/FriendInfo";
import { MessageField } from "../../components/MessageField/MessageField";
import { ResponseMessage } from "../../components/ResponseMessage/ResponseMessage";
import { UsersMessage } from "../../components/UsersMessage/UsersMessage";
import styles from "./Conversation.module.scss";
import sendMessage from "../../assets/sendMessage.svg";

type MessageData = {
    [key: string]: any;
};

export const Conversation = () => {
    const [log, setLog] = useState<string>("");

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        "ws://localhost:8080/ws",
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        if (readyState === ReadyState.OPEN) {
          sendJsonMessage({
            __TYPE__: "subscribe",
            token: localStorage.getItem("authToken"),
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
                message: (document.getElementById("message") as HTMLInputElement).value,
                recipientId: parseInt((document.getElementById("recipientId") as HTMLInputElement).value)
            };
            sendJsonMessage(messageObject);
        } else {
            console.error("WebSocket connection not open.");
        }
    };

    return (
        <div className={styles.convSection}>
            <FriendInfo name="Eduardo Burbulito"/>
            <div className={styles.messagesContainer}>
                <input type="number" id="recipientId" defaultValue="Hello, World!" />
                

                <pre>{log}</pre>
                
                
                {/* <ResponseMessage username="Eduardo Burbulito" timeAgo="15m" message="Wassup seniuk" />
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/> */}
            </div>
            <div className={styles.sendContainer}>
                <input type="text" id="message" defaultValue="Hello, World!" />
            
                <button id="send" onClick={handleClick}>
                    Send Message
                </button>
            </div>
        </div>
    );
}