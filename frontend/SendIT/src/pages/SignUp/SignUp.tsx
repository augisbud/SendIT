import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SignUp.module.scss'
import { Logo } from '../../components/Logo/Logo';
import { InputField } from '../../components/InputField/InputField';
import { Button } from '../../components/Button/Button';

interface Fields {
    username?: string;
    password?: string;
    confirmPassword?: string;
}

export const SignUp = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<Fields>();

    const handleRegister = async () => {
        if (inputData?.password !== inputData?.confirmPassword) {
            alert("Passwords are not the same.");
            return;
        }

        if (!inputData || !inputData.username || !inputData.password) {
            alert("Missing Inputs.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'origin',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData)
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem("authToken", token);

                navigate("/chat");
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert('An error occurred while registering. Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <Logo />
                    <h1 className={styles.title}>Sign Up</h1>
                </div>
                <div>
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
                        onClick={handleRegister}
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