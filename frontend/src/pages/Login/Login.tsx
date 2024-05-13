import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
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
                        label="Username"
                        value={inputData.username || ''}
                        error={errors.username}
                        onChange={ (e) => handleChange(e, setInputData) }
                    />
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        value={inputData.password || ''}
                        error={errors.password}
                        onChange={ (e) => handleChange(e, setInputData) }
                    />
                </div>
                <div>
                    <Button
                        style={{ padding: "0.5rem 0", fontSize: "18px" }}
                        onClick={ () => handleSubmit(inputData, setErrors, navigate) }
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

const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setInputData : React.Dispatch<React.SetStateAction<Fields>>) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (inputData : Fields, setErrors : React.Dispatch<React.SetStateAction<Fields>>, navigate : NavigateFunction) => {
    if (!validateFields(inputData, setErrors)) {
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

            localStorage.setItem("authToken", data.token);
            localStorage.setItem('userID', data.userID);

            navigate("/chats/1");
        } else {
            const data = await response.json();

            console.error(data.message);
        }
    } catch (error) {
        console.error('An error occurred while registering. Please try again later.');
    }
};

const validateFields = (inputData : Fields, setErrors : React.Dispatch<React.SetStateAction<Fields>>) => {
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

const validatePassword = (password: string) => {
    return password.length >= 1;
};