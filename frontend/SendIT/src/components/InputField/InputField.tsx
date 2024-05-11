import { ChangeEventHandler } from 'react';
import styles from './InputField.module.scss'

interface InputFieldProps {
  type: string;
  name: string;
  value?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const InputField = ({ type, name, value, error, onChange, label }: InputFieldProps) => {
  return (
    <div className={styles.inputField}>
      <input
        className={styles.formInput}
        type={type}
        name={name}
        id={`${name}-input`}
        value={value}
        onChange={onChange}
        placeholder=''
      />
      <label>{label}</label>
      {error && <div id={`${name}-error`} className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
