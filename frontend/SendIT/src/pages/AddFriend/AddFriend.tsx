import styles from "./AddFriend.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { AddFriendCard } from "../../components/AddFriendCard/AddFriendCard";

export const AddFriend = () => {
    return (
        <main>
            <VerticalNavbar />
            <div className={styles.wrapper}>
                <div className={styles.searchBar}>
                    <SearchBar type="text" name="find-friend"/>
                </div>
                <div className={styles.users}>
                    <AddFriendCard />
                    <AddFriendCard />
                    <AddFriendCard />
                    <AddFriendCard />
                    <AddFriendCard />
                </div>

            </div>
        </main>
    );
}