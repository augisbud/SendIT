import { useEffect, useState, ChangeEvent } from "react";
import styles from "./Inbox.module.scss";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import axios from 'axios';

interface Friend {
    senderID: string;
    id: number;
    created_at: string;
    message: string;
}

export const Inbox = () => {
    const [searchValue, setSearchValue] = useState('');
    const [chats, setChats] = useState<Friend[]>([]);
    const [filteredChats, setFilteredChats] = useState<Friend[]>([]);
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const { data } = await axios.get<Friend[]>(
                    `http://localhost:8080/chats/${userID}`,
                    {
                        headers: {
                            'Authorization': `${token}`,
                        }
                    }
                );

                const latestMessages = getLatestMessages(data);
                setChats(latestMessages);
                setFilteredChats(latestMessages); // Initially, all chats are shown
            } catch (error) {
                console.log(error);
            }
        };
        fetchChats();
    }, []);

    useEffect(() => {
        if (searchValue === '') {
            setFilteredChats(chats); // Show all chats if search is empty
        } else {
            // Doesn't work, needs to be fixed
            setFilteredChats(chats.filter(chat =>
                chat.senderID.toLowerCase().includes(searchValue.toLowerCase())
            ));
        }
    }, [searchValue, chats]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const getLatestMessages = (messages: Friend[]) => {
        const latestMessagesMap: { [key: string]: Friend } = {};

        messages.forEach((message) => {
            const senderID = message.senderID;
            if (!latestMessagesMap[senderID] || new Date(message.created_at) > new Date(latestMessagesMap[senderID].created_at)) {
                latestMessagesMap[senderID] = message;
            }
        });

        return Object.values(latestMessagesMap);
    };

    return (
        <div className={styles.inboxSection}>
            <SearchBar name="search-bar" value={searchValue} onChange={handleSearchChange} />
            
            <div className={styles.inboxFunctionsArea}>
                <h3>Inbox</h3>
            </div>

            <div className={styles.inboxList}>
                <Suggestions suggestions={filteredChats} name="find-chat" />
            </div>
        </div>
    );
};
