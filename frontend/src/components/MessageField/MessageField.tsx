import { ChangeEventHandler } from "react";
import styles from "./MessageField.module.scss";
import sendMessage from "../../assets/sendMessage.svg";

interface MessageFieldProps {
    type: string;
    name: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  }

export const MessageField = ({ type, name, onChange }: MessageFieldProps) => {
    return (
        <div className={styles.message}>
            <img src={sendMessage} alt="Send message" className={styles.sendIcon} />
            <input
                type={type}
                name={name}
                id={`${name}-input`}
                onChange={onChange}
                placeholder='Your message...'
            />
        </div>
    );
};