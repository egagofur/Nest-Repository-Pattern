import React from 'react';
import { Space, Tooltip, Button, Dropdown, Card } from 'antd';
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { iconActionTableStyle } from '../../../Utils/theme';
import { isMobileScreen } from '../../../Utils/utils';
import { Link } from '@inertiajs/inertia-react';

type ButtonType = 'view' | 'edit' | 'delete' | 'custom';

export interface IRowActionButtonsProps {
    type?: ButtonType;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    title?: string;
    disabled?: boolean;
}

export interface IRowActionProps {
    actions: IRowActionButtonsProps[];
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
    const isMobile = isMobileScreen();

    const renderButton = (action: IRowActionButtonsProps) => {
        const { type, href, onClick, title, disabled } = action;
        let { icon } = action;

        if (!icon) {
            switch (type) {
                case 'view':
                    icon = <EyeOutlined style={iconActionTableStyle} />;
                    break;
                case 'edit':
                    icon = <EditOutlined style={iconActionTableStyle} />;
                    break;
                case 'delete':
                    icon = <DeleteOutlined style={iconActionTableStyle} />;
                    break;
                default:
                    break;
            }
        }

        return (
            <Tooltip title={title} key={title}>
                {href ? (
                    <Link href={href}>
                        <Button
                            type="text"
                            shape="circle"
                            onClick={onClick}
                            icon={icon}
                            disabled={disabled}
                        />
                    </Link>
                ) : (
                    <Button
                        type="text"
                        shape="circle"
                        onClick={onClick}
                        icon={icon}
                        disabled={disabled}
                    />
                )}
            </Tooltip>
        );
    };

    return isMobile ? (
        <Dropdown
            trigger={['click']}
            overlay={
                <Card size="small">
                    <Space wrap>
                        {actions
                            .slice(0, 3)
                            .map((action) => renderButton(action))}
                    </Space>
                </Card>
            }
            placement="bottomLeft"
        >
            <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
    ) : (
        <Space direction="vertical">
            <Space wrap>{actions.map((action) => renderButton(action))}</Space>
        </Space>
    );
};
