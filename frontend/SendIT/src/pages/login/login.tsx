import React from "react";
import AuthForm from "../../components/auth-form/AuthForm";
import './login.css'

export const Login: React.FC = () => {
    return (
        <div className="container">
            <AuthForm />
        </div>
    );
};