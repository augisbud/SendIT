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

    const [inputData, setInputData] = useState<Fields>({});
    const [errors, setErrors] = useState<Fields>({});

    const validateEmail = (email: string) => {
        return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8;
    };

    const validateFields = () => {
        const newErrors: Fields = {};
        let isValid = true;

        if (!inputData.email) {
            newErrors.email = "Email address is required";
            isValid = false;
        } else if (!validateEmail(inputData.email)) {
            newErrors.email = "Please enter a valid email address.";
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

    const handleSubmit = () => {
        if (validateFields()) {
            // Placeholder for authentication logic
            // Assume the function to store JWT and navigate would be here
            navigate("/chat");
        } else {
            alert("Please correct the highlighted errors.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }));
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
                        type="email"
                        name="email"
                        label="Email address"
                        value={inputData.email || ''}
                        error={errors.email}
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        value={inputData.password || ''}
                        error={errors.password}
                        onChange={handleChange}
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
