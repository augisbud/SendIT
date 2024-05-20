import { ChangeEvent } from "react";
import styles from "./SearchBar.module.scss";
import search from "../../assets/search.svg";

interface SearchBarProps {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ name, value, onChange }: SearchBarProps) => {
    return (
        <div className={styles.searchBar}>
            <img src={search} alt="Search" className={styles.searchIcon} />
            <input
                type="text"
                name={name}
                id={`${name}-input`}
                value={value}
                placeholder="Search"
                autoComplete="off"
                onChange={onChange}
            />
        </div>
    );
};
