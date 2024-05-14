import styles from "./Inbox.module.scss";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { InboxCard } from "../../components/InboxCard/InboxCard";

export const Inbox = () => {
    return (
        <div className={styles.inboxSection}>
            <SearchBar name="search-bar"/>
            
            <div className={styles.inboxFunctionsArea}>
                <h3>Inbox</h3>
            </div>

            <div className={styles.inboxList}>
                <InboxCard />
                <InboxCard />
                <InboxCard />
                <InboxCard />
                <InboxCard />
            </div>
        </div>
    );
}