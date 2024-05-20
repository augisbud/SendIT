import styles from "./FriendInfo.module.scss";

interface FriendInfoProps {
    name: string;
  }

export const FriendInfo = ({ name }: FriendInfoProps) => {
    return (
        <div className={styles.Info}>
            <h3> {name} </h3>
        </div>
    );
};
