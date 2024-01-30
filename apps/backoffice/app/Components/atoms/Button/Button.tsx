import { Link } from '@inertiajs/inertia-react';
import { Button as AntdButton, ButtonProps } from 'antd';
import React from 'react';
import { isMobileScreen } from '../../../Utils/utils';

export interface IProps extends ButtonProps {
    icon?: React.ReactNode;
    responsive?: boolean;
}

const Button: React.FC<IProps> = ({
    icon,
    responsive = true,
    children,
    href,
    ...rest
}) => {
    const isMobile = isMobileScreen();
    const showChildren = isMobile ? responsive && !icon : true;

    if (href) {
        return (
            <Link href={href}>
                <AntdButton
                    icon={icon}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    {...rest}
                >
                    {showChildren && children}
                </AntdButton>
            </Link>
        );
    }

    return (
        <AntdButton
            icon={icon}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...rest}
        >
            {showChildren && children}
        </AntdButton>
    );
};

export default Button;
