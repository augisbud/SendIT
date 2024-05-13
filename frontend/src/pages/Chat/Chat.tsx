import { useEffect } from "react";
import styles from "./Chat.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { Inbox } from "../../sections/Inbox/Inbox";
import { Conversation } from "../../sections/Conversation/Conversation";
import useWebSocket, { ReadyState } from "react-use-websocket";

type Message = {
    message: string;
    recipientId: number;
    senderId: number;
  };

export const Chat = () => {
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

  return (
    <main>
      <VerticalNavbar />

      <div className={styles.chatWrapper}>
        <Inbox />
        <Conversation websocket={sendJsonMessage} readyState={readyState} lastJsonMes={lastJsonMessage as Message | null}/>
      </div>
    </main>
  );
};
