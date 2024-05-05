import { FriendInfo } from "../../components/FriendInfo/FriendInfo";
import { MessageField } from "../../components/MessageField/MessageField";
import { ResponseMessage } from "../../components/ResponseMessage/ResponseMessage";
import { UsersMessage } from "../../components/UsersMessage/UsersMessage";
import styles from "./Conversation.module.scss";

export const Conversation = () => {
    return (
        <div className={styles.convSection}>
            <FriendInfo name="Eduardo Burbulito"/>
            <div className={styles.messagesContainer}>
                <ResponseMessage username="Eduardo Burbulito" timeAgo="15m" message="Wassup seniuk" />
                <UsersMessage timeAgo="10m" message="Zdorovenko, kaip gyvenat?"/>
            </div>
            <div className={styles.send}>
                <MessageField type="text" name="new-message" />
            </div>
            
            
        </div>
    );
}