import { useLocation } from "react-router-dom";

import styles from "./VerticalNavbar.module.scss";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

import chatWhite from "../../assets/chat-white.svg";
import chatBlue from "../../assets/chat-blue.svg";
import friendWhite from "../../assets/friend-white.svg";
import friendBlue from "../../assets/friend-blue.svg";
import settingsWhite from "../../assets/settings-white.svg";
import settingsBlue from "../../assets/settings-blue.svg";
import logout from "../../assets/logout.svg";

export const VerticalNavbar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarBody}>
        <Logo />

        <ul className={styles.navbarMenu}>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/chat">
            <img src={pathname === "/chat" ? chatBlue : chatWhite} alt="chat" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/add-friend">
              <img src={pathname === "/add-friend" ? friendBlue : friendWhite} alt="friend" />
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link className={styles.navbarLink} to="/settings">
              <img src={pathname === "/settings" ? settingsBlue : settingsWhite} alt="settings" />
            </Link>
          </li>
        </ul>
      </div>
      <li className={styles.Logout}>
        <Link className={styles.navbarLink} to="/logout">
            <img src={logout} alt="logout" />
        </Link>
      </li>
    </div>
  );
};
