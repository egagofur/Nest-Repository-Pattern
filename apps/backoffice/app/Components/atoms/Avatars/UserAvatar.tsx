import { UserOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/inertia-react';
import { Avatar, Space, Typography } from 'antd';
import { Route } from 'apps/backoffice/app/Common/Route/Route';
import { IUser } from 'apps/backoffice/app/Modules/Profile/Entities';
import { isMobileScreen } from 'apps/backoffice/app/Utils/utils';
import React from 'react';

interface IUserAvatarProps {
    userDetail: IUser;
}

const { Text } = Typography;

const UserAvatar: React.FC<IUserAvatarProps> = ({ userDetail }) => {
    const isMobile = isMobileScreen();

    return (
        <Link href={Route.Profile}>
            <Space size="small">
                <Avatar size="default" icon={<UserOutlined />} />

                {!isMobile && (
                    <Space.Compact direction="vertical" size="small">
                        {/* Username */}
                        <Text
                            style={{
                                fontWeight: '500',
                                fontSize: '14px',
                                color: '#ffffff',
                            }}
                        >
                            {userDetail?.fullname}
                        </Text>

                        {/* User Roles */}
                        <Text
                            style={{
                                fontSize: '12px',
                                color: '#B5F5EC',
                            }}
                        >
                            {userDetail.roles?.map((r) => r.name).join(', ')}
                        </Text>
                    </Space.Compact>
                )}
            </Space>
        </Link>
    );
};

export default UserAvatar;
