import styles from "./InboxCard.module.scss";
import profile from "../../assets/profile.jpg";

interface InboxCardProps {
    username: string;
    id: number;
    created_at: string;
    message: string
}

export const InboxCard = ({ username, id, created_at, message} : InboxCardProps) => {
    // Delete year and seconds from the date
    const formattedDate = created_at.slice(5, -3);

    return (
        <div className={styles.cardArea} key={id}>
            <img src={profile} alt="profile"/>

            <div className={styles.cardDesc}>
                <div className={styles.cardHeading}>
                    <h4>{username}</h4>
                    <p>{formattedDate}</p>
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
}