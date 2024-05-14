import { useEffect, useState } from "react";
import { AddFriendCard } from "../AddFriendCard/AddFriendCard";
import axios from 'axios';
import styles from "./SearchBar.module.scss";
import search from "../../assets/search.svg";

interface SearchBarProps {
    name: string;
}

interface User {
    username: string;
    id: number;
}

export const SearchBar = ({ name }: SearchBarProps) => {

    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [hideSuggestions, setHideSuggestions] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (value) {
                try {
                    const token = localStorage.getItem("authToken");
                    const { data } = await axios.get<User[]>(
                        `http://localhost:8080/users/${value}`,
                        {
                            headers: {
                                'Authorization': `${token}`,
                            }
                        }
                    );
                    setSuggestions(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [value]);


    return (
        <>
            <div className={styles.searchBar}>
                <img src={search} alt="Search" className={styles.searchIcon} />
                <input
                    onFocus={() => setHideSuggestions(false)}
                    onBlur={async () => {
                        setTimeout(() => {
                            setHideSuggestions(true);
                        }, 200);
                    }}
                    type="text"
                    name={name}
                    id={`${name}-input`}
                    value={value}
                    placeholder='Search'
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            </div>
            <div
                className={`${styles['suggestions']} ${hideSuggestions && styles['hidden']}}`}
            >
                {suggestions.map((suggestion) => (
                    <AddFriendCard
                        id={suggestion.id}
                        username={suggestion.username}
                    />
                ))}
            </div>
        </>
    );
};