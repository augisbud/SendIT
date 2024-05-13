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

    const [inputData, setInputData] = useState<Fields>({});
    const [errors, setErrors] = useState<Fields>({});

    const validateFields = () => {
        let isValid = true;
        let newErrors: Fields = {};

        if (!inputData.username) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        if (!inputData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        if (!inputData.confirmPassword) {
            newErrors.confirmPassword = "Confirming password is required";
            isValid = false;
        }

        if (inputData.password && inputData.confirmPassword && inputData.password !== inputData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        if (!validateFields()) {
            alert("Please correct the highlighted errors before submitting.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
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
                    <h1 className={styles.title}>Sign Up</h1>
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
                        label='Password'
                        value={inputData.password || ''}
                        error={errors.password}
                        onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                    />
                    <InputField
                        type="password"
                        name="confirmPassword"
                        label='Confirm password'
                        value={inputData.confirmPassword || ''}
                        error={errors.confirmPassword}
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
