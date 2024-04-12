import React from 'react';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav>
            <div>SendIT</div>

            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/">About</a>
                </li>
                <li>
                    <a href="/">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;