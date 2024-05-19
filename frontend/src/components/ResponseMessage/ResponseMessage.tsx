import styles from "./ResponseMessage.module.scss";

interface ResponseMessageProps {
    username: string;
    message: string;
    timeAgo: string;
}

export const ResponseMessage = ({ username, message, timeAgo}: ResponseMessageProps) => {
    return (
        <div className={styles.ResponseMessage}>
            <div className={styles.UserInfo}>
                <b>{username}</b>
                <span> {timeAgo} </span>
                
            </div>
            <div className={styles.message}> {message} </div>
        </div>
    );
};