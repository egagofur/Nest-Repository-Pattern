import { Inertia } from '@inertiajs/inertia';
import React, { createContext, useEffect, useRef, useState } from 'react';

export interface IAppContext {
    appState: IAppContextState;
    notifyNavigating: () => void;
}

export interface IAppContextState {
    isNavigating: boolean;
    isRefreshing: boolean;
}

interface IAppProviderProps {
    children: React.ReactNode;
}

export const AppContext = createContext<Partial<IAppContext>>({});

export const AppProvider: React.FunctionComponent<IAppProviderProps> = (
    props,
) => {
    const [state, setState] = useState<IAppContextState>({
        isNavigating: false,
        isRefreshing: false,
    });

    const currentPathRef = useRef(window.location.pathname);

    const handleSetState = (newState: Partial<IAppContextState>) => {
        setState((oldState) => ({ ...oldState, ...newState }));
    };

    const notifyNavigating = () => {
        handleSetState({ isNavigating: true });
    };

    useEffect(() => {
        const inertiaStart = Inertia.on('start', (event) => {
            const isNavigating =
                currentPathRef.current !== event.detail.visit.url.pathname;
            currentPathRef.current = event.detail.visit.url.pathname;

            handleSetState({ isNavigating, isRefreshing: true });
        });

        const inertiaFinish = Inertia.on('finish', () => {
            handleSetState({ isNavigating: false, isRefreshing: false });
        });

        return () => {
            inertiaStart();
            inertiaFinish();
        };
    }, []);

    return (
        <AppContext.Provider
            {...props}
            value={{ appState: state, notifyNavigating }}
        />
    );
};
