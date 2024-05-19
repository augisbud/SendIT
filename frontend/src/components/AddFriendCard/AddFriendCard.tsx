import styles from "./AddFriendCard.module.scss";
import profile from "../../assets/profile.jpg";
import { Button } from "../Button/Button";
import { useNavigate } from 'react-router-dom';

interface AddFriendCardProps {
    username: string;
    id: number;
}

export const AddFriendCard = ({ username, id }: AddFriendCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/chats/${id}`);
    }

    return (
        <div className={styles.cardArea} key={id}>
            <div className={styles.cardDesc}>
                <img src={profile} alt="profile" />
                <div className={styles.cardHeading}>
                    <h4>{username}</h4>
                </div>
            </div>
            <div className={styles.buttonArea}>
                <Button style={{ padding: "0.5rem", fontSize: "18px" }} onClick={handleClick}>
                    Chat now
                </Button>
            </div>
        </div>
    );
}
