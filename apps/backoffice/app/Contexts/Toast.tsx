import { createContext } from 'react';

export interface IToastContext {
    username: string;
}

export const ToastContext = createContext<Partial<IToastContext>>({});
