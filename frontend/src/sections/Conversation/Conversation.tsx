import { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { FriendInfo } from "../../components/FriendInfo/FriendInfo";
import { ResponseMessage } from "../../components/ResponseMessage/ResponseMessage";
import { UsersMessage } from "../../components/UsersMessage/UsersMessage";
import styles from "./Conversation.module.scss";
import { Button } from "../../components/Button/Button";
import { Message } from "../../pages/Chat/Chat";
import { useParams } from "react-router-dom";

type MessageData = {
  [key: string]: any;
};

export const Conversation = ({ sendMessage, readyState, lastJsonMessage, chatData }: { sendMessage: (message: MessageData) => void, readyState: ReadyState, lastJsonMessage: Message | null, chatData: Message[] }) => {
  const [log, setLog] = useState<Message[]>([]);
  const recipientId = useParams().id;
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    setLog(chatData);
  }, [chatData]);

  useEffect(() => {
    if (lastJsonMessage && recipientId && userID && lastJsonMessage.senderId === parseInt(recipientId) && lastJsonMessage.senderId !== parseInt(userID)) {
      setLog((prevLog) => [...prevLog, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  if (userID === null || recipientId === undefined) return null;

  const handleClick = () => {
    if (readyState === ReadyState.OPEN) {
      const messageObject: MessageData = {
        __TYPE__: "message",
        token: localStorage.getItem("authToken"),
        message: (document.getElementById("message") as HTMLInputElement).value,
        recipientId: parseInt(recipientId),
        senderId: parseInt(userID),
      };

      setLog((prevLog) => [...prevLog, messageObject as Message]);
      sendMessage(messageObject);
    } else {
      console.error("WebSocket connection not open.");
    }
  };

  return (
    <div className={styles.convSection}>
      <FriendInfo name="Eduardo Burbulito" />
      <div className={styles.messagesContainer}>
        {log.map((message) => {
          if (message.senderId === parseInt(userID))
            return <UsersMessage key={message.id} timeAgo={message.created_at} message={message.message} />;
          else (message.senderId === parseInt(recipientId))
            return <ResponseMessage key={message.id} username={message.username} timeAgo={message.created_at} message={message.message} />;
        })}
      </div>
      <div className={styles.sendContainer}>
        <input type="text" id="message" placeholder="Aa" />
        <Button style={{ padding: "0.5rem 4.5rem", fontSize: "18px" }} onClick={handleClick}>
          Send Message
        </Button>
      </div>
    </div>
  );
};