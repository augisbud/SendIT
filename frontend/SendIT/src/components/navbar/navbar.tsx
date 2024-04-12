import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.svg'

const Navbar: React.FC = () => {
    return (
        <nav>
            <img className="navbar-brand" src={logo} alt="sendit" />

            <ul className="navbar-menu">
                <li className="navbar-item">
                    <a href="/" className="navbar-link">About Us</a>
                </li>
                <li className="navbar-item">
                    <a href="/" className="navbar-link">Services</a>
                </li>
                <li className="navbar-item">
                    <a href="/" className="navbar-link">Pricing</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;