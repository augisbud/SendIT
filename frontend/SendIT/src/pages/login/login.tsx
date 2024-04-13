import styles from './Login.module.scss'
import { AuthenticationForm } from "../../components/AuthenticationForm/AuthenticationForm";

export const Login = () => {
    return (
        <div className={styles.container}>
            <AuthenticationForm />
        </div>
    );
};