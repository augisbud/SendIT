import styles from "./Chat.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { Inbox } from "../../sections/Inbox/Inbox";
import { Conversation } from "../../sections/Conversation/Conversation";

export const Chat = () => {
    return (
        <main>
            <VerticalNavbar />

            <div className={styles.chatWrapper}>
                <Inbox />
                <Conversation />
            </div>
        </main>
    );
}