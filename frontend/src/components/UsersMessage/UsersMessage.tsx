import styles from "./UsersMessage.module.scss";
import profilePic from "../../assets/profile.jpg";

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
                <img src={profilePic} alt="Profile picture" width={32}/>
            </div>
            <div className={styles.message}> {message} </div>
        </div>
    );
};