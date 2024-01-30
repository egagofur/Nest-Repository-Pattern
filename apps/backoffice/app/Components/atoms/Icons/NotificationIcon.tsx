import React from 'react';
import { Badge, Tooltip } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/inertia-react';

import { Route } from 'apps/backoffice/app/Common/Route/Route';
import { TNotificationProps } from 'apps/backoffice/app/Modules/Inertia/Entities';

interface INotificationIconProps {
    notifications: TNotificationProps;
}

const NotificationIcon: React.FC<INotificationIconProps> = ({
    notifications,
}) => {
    return (
        <Tooltip title="Notifications" placement="right">
            <Link href={Route.Notification}>
                <Badge dot={notifications?.notificationUnread > 0}>
                    <BellOutlined
                        style={{
                            display: 'block',
                            color: 'white',
                            fontSize: '21px',
                        }}
                    />
                </Badge>
            </Link>
        </Tooltip>
    );
};

export default NotificationIcon;
