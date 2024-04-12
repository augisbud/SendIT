import React, { CSSProperties, ReactNode } from 'react';

import './button.css';

interface ButtonProps {
  style?: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, style, onClick }) => {
  return (
    <div className='button' style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
