import { Link } from "react-router-dom"
import styles from './Logo.module.scss'
import logo from '../../assets/logo.svg'

export const Logo = () => {
    return (
        <Link to={"/"}>
            <img className={styles.logo} src={logo} alt="SendIT" />
        </Link>
    )
}