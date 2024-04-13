import { Logo } from '../Logo/Logo';
import styles from './Navbar.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav>
            <Logo />
                        
            <ul className={styles.navbarMenu}>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} to={"/"}>About Us</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} to={"/"}>Services</Link>
                </li>
                <li className={styles.navbarItem}>
                    <Link className={styles.navbarLink} to={"/"}>Pricing</Link>
                </li>
                <Link to={"/login"} style={{textDecoration: "none"}}>
                    <Button style={{padding: "0.5rem 1.5rem", fontSize: "18px"}}>Login</Button>
                </Link>
            </ul>
        </nav>
    );
};