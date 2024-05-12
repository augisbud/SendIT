import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { FriendInfo } from "../../components/FriendInfo/FriendInfo";
import { MessageField } from "../../components/MessageField/MessageField";
import { ResponseMessage } from "../../components/ResponseMessage/ResponseMessage";
import { UsersMessage } from "../../components/UsersMessage/UsersMessage";
import styles from "./Conversation.module.scss";
import { Button } from "../../components/Button/Button";

type MessageData = {
  [key: string]: any;
};

export const Conversation = () => {
  const [log, setLog] = useState<MessageData[]>([]);

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

  useEffect(() => {
    if (lastJsonMessage) {
      setLog((prevLog) => [...prevLog, { ...lastJsonMessage, id: Date.now() }]);
    }
  }, [lastJsonMessage]);

//   useEffect(() => {
//     if (lastJsonMessage) {
//       setLog((prevLog) => [...prevLog, lastJsonMessage]);
//     }
//   }, [lastJsonMessage]);

  const handleClick = () => {
    if (readyState === ReadyState.OPEN) {
      const messageObject: MessageData = {
        __TYPE__: "message",
        message: (document.getElementById("message") as HTMLInputElement).value,
        recipientId: parseInt(
          (document.getElementById("recipientId") as HTMLInputElement).value
        ),
        sentByUser: true,
      };
      sendJsonMessage(messageObject);
    } else {
      console.error("WebSocket connection not open.");
    }
  };

  return (
    <div className={styles.convSection}>
      <FriendInfo name="Eduardo Burbulito" />
      <div className={styles.messagesContainer}>
        <input type="number" id="recipientId" defaultValue="Hello, World!" />

        {log.map(message => {
          if (message.sentByUser) {
            return (
              <UsersMessage
                timeAgo="Now"
                message={message.message}
              />
            );
          } else {
            return (
              <ResponseMessage
                username="Eduardo Burbulito"
                timeAgo="Now"
                message={message.message}
              />
            );
          }
        })}
        {/* <pre>{log}</pre> */}

        {/* <ResponseMessage username="Eduardo Burbulito" timeAgo="15m" message="Wassup seniuk" />
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/> */}
      </div>
      <div className={styles.sendContainer}>
        <input type="text" id="message" placeholder="Aa" />

        <Button
          style={{ padding: "0.5rem 4.5rem", fontSize: "18px" }}
          onClick={handleClick}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};
