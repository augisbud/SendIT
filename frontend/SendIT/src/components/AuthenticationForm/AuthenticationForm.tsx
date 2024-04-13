import styles from './AuthenticationForm.module.scss'
import logo from '../../assets/logo.svg'
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { InputField } from '../InputField/InputField';

export const AuthenticationForm = () => {
    return (
        <div className={styles.form}>
            <div>
                <Link to={"/"}>
                    <div className={styles.logo}>
                        <img src={logo} alt="SendIT" />
                    </div>
                </Link>
                
                <h2 className={styles.heading}>Welcome back</h2>
            </div>
            <div className={styles.inputCont}>
                <InputField type="email" id="email-input" label='Email address' />
                <InputField type="password" id="password-input" label='Password' />
            </div>
            <div className={styles.buttonCont}>
                <Button style={{padding: "0.25rem 0.75rem", fontSize: "12px"}}>Login</Button>
            </div>
            <div>
                Don't have an account? <Link to={"/signup"}>Sign Up</Link>
            </div>
        </div>
    );
}