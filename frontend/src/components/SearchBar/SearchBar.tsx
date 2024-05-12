import { ChangeEventHandler } from "react";
import styles from "./SearchBar.module.scss";
import search from "../../assets/search.svg";

interface SearchBarProps {
    type: string;
    name: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  }

export const SearchBar = ({ type, name, onChange }: SearchBarProps) => {
    return (
        <div className={styles.searchBar}>
            <img src={search} alt="Search" className={styles.searchIcon} />
            <input
                type={type}
                name={name}
                id={`${name}-input`}
                onChange={onChange}
                placeholder='Search'
            />
        </div>
    );
};