import styles from './InputField.module.scss'

interface InputFieldProps {
    type: string;
    id: string;
    label: string;
}

export const InputField = ({ type, id, label } : InputFieldProps) => {
  return (
    <div className={styles.inputField}>
        <input className={styles.formInput} type={type} id={id} placeholder=''/>
        <label> {label} </label>
    </div>
  );
};
