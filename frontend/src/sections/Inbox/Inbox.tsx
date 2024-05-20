import { useEffect, useState, ChangeEvent } from "react";
import styles from "./Inbox.module.scss";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import axios from 'axios';
import { useToken } from "../../utils/Cache";

export interface Chat {
    id: number;
    senderName: string;
    recipientName: string;
    senderId: number;
    receiverId: number;
    message: string;
    created_at: string;
}

export const Inbox = () => {
    const { token } = useToken();
    const [searchValue, setSearchValue] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await axios.get<Chat[]>(
                    `http://localhost:8080/chats`,
                    {
                        headers: {
                            'Authorization': `${token}`,
                        }
                    }
                );

                setChats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchChats();
    }, []);

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
