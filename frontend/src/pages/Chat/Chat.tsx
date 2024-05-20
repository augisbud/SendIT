import styles from "./Chat.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { Inbox } from "../../sections/Inbox/Inbox";
import { Conversation } from "../../sections/Conversation/Conversation";
import { ReadyState } from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../../utils/Cache";

export type Message = {
    id: string;
    senderId: number;
    recipientId: number;
    username: string;
    message: string;
    created_at: string;
};

export const Chat = ({ sendJsonMessage, readyState, lastJsonMessage }: { sendJsonMessage: SendJsonMessage, readyState: ReadyState, lastJsonMessage: any }) => {
    const { id: recipientId } = useParams();
    const { token } = useToken();
    const [ chatData, setChatData ] = useState<Message[]>([]);

    useEffect(() => {
        const fetchChatData = async () => {
            const response = await fetch(`http://sendit.zzzz.lt:5552/chats/${recipientId}`, {
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
                <Inbox />
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
