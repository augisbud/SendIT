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

interface User {
    username: string;
    id: number;
}

export const Inbox = ({lastJsonMessage} : { lastJsonMessage : any }) => {
    const userId = localStorage.getItem("userID");
    const { token } = useToken();
    const { message } = useMessage();
    const [searchValue, setSearchValue] = useState('');
    const [chats, setChats] = useState<Chat[]>([]);
    const [userSuggestions, setUserSuggestions] = useState<User[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await axios.get<RawChat[]>(
                    `http://sendit.zzzz.lt:5552/chats`,
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

        const fetchUsers = async () => {
            if (searchValue) {
                try {
                    const { data } = await axios.get<User[]>(
                        `http://sendit.zzzz.lt:5552/users/${searchValue}`,
                        {
                            headers: {
                                'Authorization': `${token}`,
                            }
                        }
                    );
                    setUserSuggestions(data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserSuggestions([]);
            }
        };

        fetchChats();
        fetchUsers();
    }, [lastJsonMessage, message, searchValue, token, userId]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const clearSearch = () => {
        setSearchValue('');
    };

    return (
        <div className={styles.inboxSection}>
            <SearchBar name="search-bar" value={searchValue} onChange={handleSearchChange} />

            <div className={styles.inboxFunctionsArea}>
                <h3>Inbox</h3>
            </div>

            <div className={styles.inboxList}>
                {searchValue ? (
                    <Suggestions suggestions={userSuggestions} name="find-friend" onClearSearch={clearSearch}/>
                ) : (
                    <Suggestions suggestions={chats} name="find-chat" onClearSearch={clearSearch}/>
                )}
            </div>
        </div>
    );
};
