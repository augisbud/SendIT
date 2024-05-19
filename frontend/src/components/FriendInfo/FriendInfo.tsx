import styles from "./FriendInfo.module.scss";
import profile from "../../assets/profile.jpg";

interface FriendInfoProps {
    name: string;
  }

export const FriendInfo = ({ name }: FriendInfoProps) => {
    return (
        <div className={styles.Info}>
            {/* <img src={profile} alt="Profile picture"/>  */}
            <h3> {name} </h3>
        </div>
    );
};