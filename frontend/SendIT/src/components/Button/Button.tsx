import { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  style?: CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
}

export const Button = ({ style, onClick, children }: ButtonProps) => {
  return (
    <div className={styles.button} style={style} onClick={onClick}>
      {children}
    </div>
  );
};