import { MenuOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { TNotificationProps } from 'apps/backoffice/app/Modules/Inertia/Entities';
import { IUser } from 'apps/backoffice/app/Modules/Profile/Entities';
import { themeColors } from 'apps/backoffice/app/Utils/theme';
import React from 'react';
import { UserAvatar } from '../../atoms/Avatars';
import NotificationIcon from '../../atoms/Icons/NotificationIcon';
import { CompanyLogo } from '../../atoms/Logos';

interface IMainHeaderProps {
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    collapsed: boolean;
    userDetail: IUser;
    notifications: TNotificationProps;
}

const MainHeader: React.FC<IMainHeaderProps> = ({
    setCollapsed,
    collapsed,
    userDetail,
    notifications,
}) => {
    return (
        <Header
            style={{
                backgroundColor: themeColors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingInline: '24px',
            }}
        >
            <Space size={30}>
                {React.createElement(MenuOutlined, {
                    className: 'trigger',
                    style: {
                        color: 'white',
                    },
                    onClick: () => setCollapsed(!collapsed),
                })}

                <CompanyLogo />
            </Space>

            <Space size={10} align="center">
                <UserAvatar userDetail={userDetail} />
                <NotificationIcon notifications={notifications} />
            </Space>
        </Header>
    );
};

export default MainHeader;
