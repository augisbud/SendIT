import styles from "./UsersMessage.module.scss";

interface UsersMessageProps {
    message: string;
    timeAgo: string;
}

export const UsersMessage = ({ message, timeAgo}: UsersMessageProps) => {
    return (
        <div className={styles.UsersMessage}>
            <div className={styles.UserInfo}>
                <b>You</b>
                <span> {timeAgo} </span>
            </div>
            <div className={styles.message}> {message} </div>
        </div>
    );
};