import { useEffect, useState, ChangeEvent } from "react";
import styles from "./Inbox.module.scss";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import axios from 'axios';
import { useMessage, useToken } from "../../utils/Cache";

export interface RawChat {
    id: number;
    senderName: string;
    recipientName: string;
    senderId: number;
    receiverId: number;
    message: string;
    created_at: string;
}

export interface Chat {
    id: number;
    displayName: string;
    message: string;
    created_at: string;
}

export const Inbox = ({lastJsonMessage} : { lastJsonMessage : any }) => {
    const userId = localStorage.getItem("userID");
    const { token } = useToken();
    const { message } = useMessage();
    const [searchValue, setSearchValue] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await axios.get<RawChat[]>(
                    `http://localhost:8080/chats`,
                    {
                        headers: {
                            'Authorization': `${token}`,
                        }
                    }
                );

                const chats : Chat[] = [];

                data.forEach(r => {
                    const id = (parseInt(userId!) == r.senderId) ? r.receiverId : r.senderId;
                    const displayName = (parseInt(userId!) == r.senderId) ? r.recipientName : r.senderName;

                    chats.push({ id: id, displayName: displayName, message: r.message, created_at: r.created_at});
                });

                setChats(chats);
            } catch (error) {
                console.error(error);
            }
        };
        fetchChats();
    }, [lastJsonMessage, message]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={styles.inboxSection}>
            <SearchBar name="search-bar" value={searchValue} onChange={handleSearchChange} />

            <div className={styles.inboxFunctionsArea}>
                <h3>Inbox</h3>
            </div>

            <div className={styles.inboxList}>
                <Suggestions suggestions={chats} name="find-chat" />
            </div>
        </div>
    );
};
