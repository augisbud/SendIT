import styles from "./Chat.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { Inbox } from "../../sections/Inbox/Inbox";
import { Conversation, MessageData } from "../../sections/Conversation/Conversation";
import { ReadyState } from "react-use-websocket";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../../utils/Cache";

export type Message = {
    id: string;
    senderId: number;
    recipientId: number;
    senderName: string;
    message: string;
    created_at: string;
};

export const Chat = ({ sendJsonMessage, readyState, lastJsonMessage }: { sendJsonMessage: (message: MessageData) => void, readyState: ReadyState, lastJsonMessage: any }) => {
    const { id: recipientId } = useParams();
    const { token } = useToken();
    const [ chatData, setChatData ] = useState<Message[]>([]);

    useEffect(() => {
        const fetchChatData = async () => {
            const response = await fetch(`http://localhost:8080/chats/${recipientId}`, {
                method: "GET",
                headers: {
                    'Authorization': token!
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setChatData(data as Message[]);
        };

        fetchChatData();
    }, [recipientId]);

    return (
        <main>
            <VerticalNavbar />

            <div className={styles.chatWrapper}>
                <Inbox lastJsonMessage={lastJsonMessage as Message | null}  />
                <Conversation 
                    sendMessage={sendJsonMessage} 
                    readyState={readyState} 
                    lastJsonMessage={lastJsonMessage as Message | null} 
                    chatData={chatData}
                />
            </div>
        </main>
    );
};
