import styles from './Login.module.scss'
import { Logo } from '../../components/Logo/Logo';
import { InputField } from '../../components/InputField/InputField';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <Logo />
                    <h1 className={styles.title}>Welcome back</h1>
                </div>
                <div>
                    <InputField type="email" id="email-input" label='Email address' />
                    <InputField type="password" id="password-input" label='Password' />
                </div>
                <div>
                    <Button style={{padding: "0.25rem 0", fontSize: "12px", width: "100%"}}>Login</Button>
                </div>
                <div>
                    Don't have an account? <Link to={"/signup"}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};