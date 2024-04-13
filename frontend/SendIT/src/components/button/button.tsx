import { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  style?: CSSProperties;
  children?: ReactNode;
}

export const Button = ({ style, children } : ButtonProps) => {
  return (
    <div className={styles.button} style={style}>
      {children}
    </div>
  );
};