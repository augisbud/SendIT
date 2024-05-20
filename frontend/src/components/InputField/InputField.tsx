import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
  type: string;
  name: string;
  value?: string;
  error?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onEnterPress?: () => void;
  label: string;
}

export const InputField = ({ type, name, value, error, placeholder, onChange, onEnterPress, label }: InputFieldProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && onEnterPress) {
      event.preventDefault();
      onEnterPress();
    }
  };

  return (
    <div className={styles.inputField}>
      <input
        className={styles.formInput}
        type={type}
        name={name}
        id={`${name}-input`}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
      />
      <label htmlFor={`${name}-input`}>{label}</label>
      {error && <div id={`${name}-error`} className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
