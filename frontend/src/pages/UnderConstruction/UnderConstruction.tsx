import styles from './UnderConstruction.module.scss'
import underCon from '../../assets/underCon.png'
import { VerticalNavbar } from '../../components/VerticalNavbar/VerticalNavbar'

export const UnderConstruction = () => {
    return (
        <div className={styles.container}>
            <VerticalNavbar />
            <div className={styles.content}>
                <h1>We're Building Something Great!</h1>
                <p>Our website is currently under construction. Stay tuned for something amazing!</p>
                <img src={underCon} alt="Under Construction" />
            </div>
        </div>
    )
}