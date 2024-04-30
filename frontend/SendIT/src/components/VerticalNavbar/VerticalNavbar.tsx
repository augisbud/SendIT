import styles from "./VerticalNavbar.module.scss";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

import chat from "../../assets/chat.svg";
import friend from "../../assets/friend.svg";
import mode from "../../assets/mode.svg";
import settings from "../../assets/settings.svg";

export const VerticalNavbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarBody}>
        <Logo />

        <ul className={styles.navbarMenu}>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/"}>
              <img src={chat} alt="chat" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/"}>
                <img src={friend} alt="friend" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/"}>
                <img src={mode} alt="mode" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/"}>
                <img src={settings} alt="settings" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
