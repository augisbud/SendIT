import styles from "./AddFriendCard.module.scss";
import profile from "../../assets/profile.jpg";
import { useNavigate } from 'react-router-dom';

interface AddFriendCardProps {
    username: string;
    id: number;
    onClearSearch: () => void;
}

export const AddFriendCard = ({ username, id, onClearSearch }: AddFriendCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onClearSearch();
        navigate(`/chats/${id}`);
    }

    return (
        <div className={styles.cardArea} key={id} onClick={handleClick}>
            <div className={styles.cardDesc}>
                <img src={profile} alt="profile" />
                <div className={styles.cardHeading}>
                    <h4>{username}</h4>
                </div>
            </div>
        </div>
    );
}
