import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.scss'
import { Logo } from '../../components/Logo/Logo';
import { InputField } from '../../components/InputField/InputField';
import { Button } from '../../components/Button/Button';

interface Fields {
    username?: string;
    password?: string;
}

export const Login = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<Fields>({});
    const [errors, setErrors] = useState<Fields>({});

    const validatePassword = (password: string) => {
        return password.length >= 1;
    };

    const validateFields = () => {
        const newErrors: Fields = {};
        let isValid = true;

        if (!inputData.username) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        if (!inputData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (!validatePassword(inputData.password)) {
            newErrors.password = "Password must be at least 8 characters long.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            alert("Please correct the highlighted errors before submitting.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData)
            });

            if (response.ok) {
                const data = await response.json();
                let token = data.token;
                token = token.replace("Basic ", ""); // Adjusting based on token type (Bearer assumed)

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
                    <h1 className={styles.title}>Welcome back</h1>
                </div>
                <div>
                    <InputField
                        type="text"
                        name="username"
                        label='Username'
                        value={inputData.username || ''}
                        error={errors.username}
                        onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        value={inputData.password || ''}
                        error={errors.password}
                        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                    />
                </div>
                <div>
                    <Button
                        style={{ padding: "0.5rem 0", fontSize: "18px" }}
                        onClick={handleSubmit}
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
