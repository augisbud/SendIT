import styles from "./AddFriend.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export const AddFriend = () => {
    return (
        <main>
            <VerticalNavbar />
            <div className={styles.wrapper}>
                <div className={styles.searchBar}>
                    <SearchBar name="find-friend"/>
                </div>
            </div>
        </main>
    );
}