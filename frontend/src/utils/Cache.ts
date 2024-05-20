import { create } from 'zustand';
import { MessageData } from '../sections/Conversation/Conversation';

interface IToken {
    token: string | null;
    setToken: (token: string | null) => void;
}

export const useToken = create<IToken>((set) => {
    const initialToken = localStorage.getItem('token');

    return {
        token: initialToken,
        setToken: (token) => {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
            set({ token });
        },
    };
});

interface IMessage {
    message: MessageData | null;
    setMessage: (message: MessageData) => void;
}

export const useMessage = create<IMessage>(
    (set) => ({
        message: null,
        setMessage: (message) => set({ message }),
    })
);
