import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SignUp.module.scss'
import { Logo } from '../../components/Logo/Logo';
import { InputField } from '../../components/InputField/InputField';
import { Button } from '../../components/Button/Button';

interface Fields {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
}

export const SignUp = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<Fields>();

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <Logo />
                    <h1 className={styles.title}>Sign Up</h1>
                </div>
                <div>
                    <InputField
                        type="email"
                        name="email"
                        label='Email address'
                        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                    />
                    <InputField
                        type="text"
                        name="username"
                        label='Username'
                        onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label='Password'
                        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                    />
                    <InputField
                        type="password"
                        name="confirmPassword"
                        label='Confirm password'
                        onChange={(e) => setInputData({ ...inputData, confirmPassword: e.target.value })}
                    />
                </div>
                <div>
                    <Button
                        style={{ padding: "0.5rem 0", fontSize: "18px" }}
                        onClick={
                            () => {
                                if (!inputData || !inputData.email || !inputData.username || !inputData.password || !inputData.confirmPassword) {
                                    alert("Missing Inputs.");

                                    return;
                                }

                                // GO FETCH, store JWT in localStorage
                                navigate("/");
                            }
                        }
                    >
                        Create an account
                    </Button>
                </div>
                <div>
                    Already have an account? <Link to={"/login"}>Login now</Link>
                </div>
            </div>
        </div>
    );
};