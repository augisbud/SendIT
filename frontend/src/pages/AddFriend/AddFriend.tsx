import { useEffect, useState, ChangeEvent } from "react";
import styles from "./AddFriend.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import axios from 'axios';
import { useToken } from "../../utils/Cache";

interface User {
    username: string;
    id: number;
}

export const AddFriend = () => {
    const { token } = useToken();
    
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (value) {
                try {
                    const { data } = await axios.get<User[]>(
                        `http://sendit.zzzz.lt:5552/users/${value}`,
                        {
                            headers: {
                                'Authorization': `${token}`,
                            }
                        }
                    );
                    setSuggestions(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <main>
            <VerticalNavbar />
            <div className={styles.wrapper}>
                <div className={styles.searchBar}>
                    <SearchBar
                        name="find-friend"
                        value={value}
                        onChange={handleInputChange}
                    />
                </div>
                <Suggestions suggestions={suggestions} name="find-friend" />
            </div>
        </main>
    );
};
