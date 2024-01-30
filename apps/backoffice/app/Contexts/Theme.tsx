import { ConfigProvider, theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { globalThemeConfig } from '../Utils/theme';

export interface IThemeContext {
    isDarkMode: boolean;
    handleSwitchTheme: (boolean: boolean) => void;
}

interface IThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<Partial<IThemeContext>>({});

export const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = (
    props,
) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies(['darkMode']);

    const handleSwitchTheme = (isDarkMode: boolean) => {
        setIsDarkMode(isDarkMode);
        setCookie('darkMode', isDarkMode, { path: '/' });
    };

    const { darkAlgorithm, defaultAlgorithm } = theme;

    const themeAlgorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm;
    const tableComponentStyle = isDarkMode
        ? {
              controlItemBgActive: undefined,
              controlItemBgActiveHover: undefined,
          }
        : globalThemeConfig['components']['Table'];

    const customThemeConfig: ThemeConfig = {
        ...globalThemeConfig,
        algorithm: themeAlgorithm,
        components: {
            Table: tableComponentStyle,
        },
    };

    return (
        <ThemeContext.Provider
            {...props}
            value={{
                isDarkMode: cookies.darkMode
                    ? cookies.darkMode == 'true' && true
                    : isDarkMode,
                handleSwitchTheme,
            }}
        >
            <ConfigProvider theme={customThemeConfig}>
                {props.children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};
