import { RowProps, SpaceProps } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { CSSProperties } from 'react';

export const themeColors = {
    primary: '#006D75',
    secondary: '',
    success: '',
    warning: '',
    error: '#FF4D4F',
    info: '',
};

export const darkThemeColors = {
    primary: '#001213',
};

export const iconActionTableStyle: CSSProperties = {
    color: themeColors.primary,
    fontSize: '14px',
};

export const sidebarThemeConfig: ThemeConfig = {
    components: {
        Menu: {
            colorItemText: '#ffffff',
            colorItemTextHover: '#ffffff',
            colorItemTextSelected: '#ffffff',
            colorItemBgHover: '#08979C',
            colorItemBgSelected: '#08979C',
            fontSize: 14,
        },
    },
};

export const defaultGutter: RowProps['gutter'] = [16, 16];

export const defaultSizeSpace: SpaceProps['size'] = 'middle';

export const globalThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: themeColors.primary,
    },
    components: {
        Table: {
            controlItemBgActive: '#E6FFFB',
            controlItemBgActiveHover: '#E6FFFB',
        },
    },
};
