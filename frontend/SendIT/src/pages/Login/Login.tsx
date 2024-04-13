import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.scss'
import { Logo } from '../../components/Logo/Logo';
import { InputField } from '../../components/InputField/InputField';
import { Button } from '../../components/Button/Button';

interface Fields {
    email?: string;
    password?: string;
}

export const Login = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<Fields>();

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <Logo />
                    <h1 className={styles.title}>Welcome back</h1>
                </div>
                <div>
                    <InputField
                        type="email"
                        name="email"
                        label='Email address'
                        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label='Password'
                        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                    />
                </div>
                <div>
                    <Button
                        style={{ padding: "0.25rem 0", fontSize: "12px", width: "100%" }}
                        onClick={
                            () => {
                                if (!inputData || !inputData.email || !inputData.password) {
                                    alert("Missing Inputs.");

                                    return;
                                }

                                // GO FETCH, store JWT in localStorage
                                navigate("/");
                            }
                        }
                    >
                        Login
                    </Button>
                </div>
                <div>
                    Don't have an account? <Link to={"/signup"}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};