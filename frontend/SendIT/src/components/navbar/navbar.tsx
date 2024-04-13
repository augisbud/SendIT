import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg'
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav>
            <img className={styles.navbarBrand} src={logo} alt="SendIT" />

            <ul className={styles.navbarMenu}>
                <li className={styles.navbarItem}>
                    <a href="/" className={styles.navbarLink}>About Us</a>
                </li>
                <li className={styles.navbarItem}>
                    <a href="/" className={styles.navbarLink}>Services</a>
                </li>
                <li className={styles.navbarItem}>
                    <a href="/" className={styles.navbarLink}>Pricing</a>
                </li>
                <Link to={"/login"} style={{textDecoration: "none"}}>
                    <Button style={{padding: "0.5rem 1.5rem", fontSize: "18px"}}>Login</Button>
                </Link>
            </ul>
        </nav>
    );
};