import styles from "./ResponseMessage.module.scss";
import profilePic from "../../assets/profile.svg";

interface ResponseMessageProps {
    username: string;
    message: string;
    timeAgo: string;
}

export const ResponseMessage = ({ username, message, timeAgo}: ResponseMessageProps) => {
    return (
        <div className={styles.ResponseMessage}>
            <div className={styles.UserInfo}>
                <img src={profilePic} alt="Profile picture" width={32}/>
                <b>{username}</b>
                <span> {timeAgo} </span>
                
            </div>
            <div className={styles.message}> {message} </div>
        </div>
    );
};