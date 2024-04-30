import { useLocation } from "react-router-dom";

import styles from "./VerticalNavbar.module.scss";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

import chat from "../../assets/chat.svg";
import friend from "../../assets/friend.svg";
import mode from "../../assets/mode.svg";
import settings from "../../assets/settings.svg";
import logout from "../../assets/logout.svg";

export const VerticalNavbar = () => {
  const location = useLocation();

  const path = location.pathname;

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarBody}>
        <Logo />

        <ul className={styles.navbarMenu}>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/chat"}>
              <img src={chat} alt="chat" className={`${path === "/chat" ? styles.active : ""}`}/>
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/friend"}>
                <img src={friend} alt="friend" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/"}>
                <img src={mode} alt="mode" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to={"/settings"}>
                <img src={settings} alt="settings" />
            </Link>
          </li>
        </ul>
      </div>
      <li className={styles.Logout}>
            <Link className={styles.navbarLink} to={"/"}>
                <img src={logout} alt="logout" />
            </Link>
          </li>
    </div>
  );
};
