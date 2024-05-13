import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { FriendInfo } from "../../components/FriendInfo/FriendInfo";
import { ResponseMessage } from "../../components/ResponseMessage/ResponseMessage";
import { UsersMessage } from "../../components/UsersMessage/UsersMessage";
import styles from "./Conversation.module.scss";
import { Button } from "../../components/Button/Button";

type MessageData = {
  [key: string]: any;
};

type Message = {
  message: string,
  recipientId: number,
  senderId: number
}

export const Conversation = () => {
  const [log, setLog] = useState<Message[]>([]);

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
        token: localStorage.getItem("authToken"),
      });
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      setLog(l => [...l, lastJsonMessage as Message])
    }
  }, [lastJsonMessage]);

  const handleClick = () => {
    if (readyState === ReadyState.OPEN) {
      const messageObject: MessageData = {
        __TYPE__: "message",
        token: localStorage.getItem("authToken"),
        message: (document.getElementById("message") as HTMLInputElement).value,
        recipientId: parseInt((document.getElementById("recipientId") as HTMLInputElement).value),
        senderId: parseInt(localStorage.getItem("userID") || "0", 10)
      };

      setLog(prevLog => [...prevLog, messageObject as Message]);
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

        {
          log.map(message => {
            console.log("Sender ID:", message.senderId);
            const isSentByUser = message.senderId === parseInt(localStorage.getItem("userID") || "0", 10);
            console.log("Is sent by user:", isSentByUser);

            if (isSentByUser) // reikia patvarkyt, kad tai yra lygu logged in userio id.
              return <UsersMessage timeAgo="Now" message={message.message} />
            else
              return <ResponseMessage username="Eduardo Burbulito" timeAgo="Now" message={message.message} />
          })
        }
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
