import styles from "./InboxCard.module.scss";

import profile from "../../assets/profile.jpg";

export const InboxCard = () => {
    return (
        <div className={styles.cardArea}>
            <img src={profile} alt="profile"/>

            <div className={styles.cardDesc}>
                <div className={styles.cardHeading}>
                    <h4>Eduardo Burbulito</h4>
                    <p>20:36</p>
                </div>
                <p>Ka yra</p>
            </div>
        </div>
    );
}