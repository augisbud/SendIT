import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SignUp.module.scss'
import { Logo } from '../../components/Logo/Logo';
import { InputField } from '../../components/InputField/InputField';
import { Button } from '../../components/Button/Button';

interface Fields {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const SignUp = () => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<Fields>({});
    const [errors, setErrors] = useState<Fields>({});

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
                        type="email"
                        name="email"
                        label='Email address'
                        value={inputData.email || ''}
                        error={errors.email}
                        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
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
                        onClick={ () => handleRegister(inputData, setErrors, navigate) }
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

const handleRegister = async (inputData : Fields, setErrors : React.Dispatch<React.SetStateAction<Fields>>, navigate : NavigateFunction) => {
    if (!validateFields(inputData, setErrors)) {
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

            localStorage.setItem("authToken", data.token);
            navigate("/chat");
        } else {
            const data = await response.json();

            console.error(data.message);
        }
    } catch (error) {
        console.error('An error occurred while registering. Please try again later.');
    }
};

const validateFields = (inputData : Fields, setErrors : React.Dispatch<React.SetStateAction<Fields>>) => {
    let isValid = true;
    let newErrors: Fields = {};

    if (!inputData.username) {
        newErrors.username = "Username is required";
        isValid = false;
    }

    if (!inputData.email) {
        newErrors.email = "Email is required";
        isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputData.email)) {
        newErrors.email = "Email is invalid";
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