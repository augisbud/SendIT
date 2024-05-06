import styles from "./AddFriendCard.module.scss";
import profile from "../../assets/profile.svg";
import { Button } from "../Button/Button";

export const AddFriendCard = () => {
    return (
        <div className={styles.cardArea}>
            <div className={styles.cardDesc}>
                <img src={profile} alt="profile" />
                <div className={styles.cardHeading}>
                    <h4>Eduardo Burbulito</h4>
                </div>
            </div>
            <div className={styles.buttonArea}>
                <Button style={{ padding: "0.5rem", fontSize: "18px" }}>
                    Add friend
                </Button>
            </div>
        </div>
    );
}
