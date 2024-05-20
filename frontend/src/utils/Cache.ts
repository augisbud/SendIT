import { create } from 'zustand';

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
