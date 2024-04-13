import { ChangeEventHandler } from 'react';
import styles from './InputField.module.scss'

interface InputFieldProps {
  type: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const InputField = ({ type, name, onChange, label }: InputFieldProps) => {
  return (
    <div className={styles.inputField}>
      <input
        className={styles.formInput}
        type={type}
        name={name}
        id={`${name}-input`}
        onChange={onChange}
        placeholder=''
      />
      <label>{label}</label>
    </div>
  );
};
