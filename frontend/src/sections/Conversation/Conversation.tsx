import { useEffect, useRef, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { FriendInfo } from "../../components/FriendInfo/FriendInfo";
import { ResponseMessage } from "../../components/ResponseMessage/ResponseMessage";
import { UsersMessage } from "../../components/UsersMessage/UsersMessage";
import styles from "./Conversation.module.scss";
import { Button } from "../../components/Button/Button";
import { Message } from "../../pages/Chat/Chat";
import { useParams } from "react-router-dom";
import { InputField } from "../../components/InputField/InputField";
import { useToken } from "../../utils/Cache";
import { getDateTime } from "../../utils/Date";

export type MessageData = {
  [key: string]: any;
};

export const Conversation = ({ sendMessage, readyState, lastJsonMessage, chatData }: { sendMessage: (message: MessageData) => void, readyState: ReadyState, lastJsonMessage: Message | null, chatData: Message[] }) => {
  const [log, setLog] = useState<Message[]>([]);
  const { token } = useToken();
  const recipientId = useParams().id;
  const userID = localStorage.getItem("userID");
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLog(chatData);
  }, [chatData]);

  useEffect(() => {
    console.log(lastJsonMessage);
    if (lastJsonMessage && recipientId && userID && lastJsonMessage.senderId === parseInt(recipientId) && lastJsonMessage.senderId !== parseInt(userID)) {
      setLog((prevLog) => [...prevLog, lastJsonMessage]);
    }
  }, [lastJsonMessage, recipientId, userID]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [log]);

  if (userID === null || recipientId === undefined) return null;

  const recipientName =
    log.find((msg) => msg.senderId === parseInt(recipientId))?.senderName || "Unknown User";

  const handleClick = () => {
    if (readyState === ReadyState.OPEN) {
      const messageObject: MessageData = {
        __TYPE__: "message",
        token: token,
        message: message,
        recipientId: parseInt(recipientId),
        senderId: parseInt(userID),
        created_at: getDateTime()
      };

      setLog((prevLog) => [...prevLog, messageObject as Message]);
      sendMessage(messageObject);
      setMessage('');
    } else {
      console.error("WebSocket connection not open.");
    }
  };

  const handleEnterPress = () => {
    handleClick();
  };

  return (
    <div className={styles.convSection}>
      <FriendInfo name={recipientName} />
      <div className={styles.messagesContainer}>
        {log.map((message, index) => {
          if (message.senderId === parseInt(userID))
            return <UsersMessage key={message.id || index} timeAgo={message.created_at} message={message.message} />;
          else if (message.senderId === parseInt(recipientId))
            return <ResponseMessage key={message.id || index} username={message.senderName} timeAgo={message.created_at} message={message.message} />;

          return null;
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.sendContainer}>
        <InputField
          type="text"
          name="message"
          label=""
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onEnterPress={handleEnterPress}
        />
        <Button style={{ padding: "0.5rem 4.5rem", fontSize: "18px" }} onClick={handleClick}>
          Send Message
        </Button>
      </div>
    </div>
  );
};