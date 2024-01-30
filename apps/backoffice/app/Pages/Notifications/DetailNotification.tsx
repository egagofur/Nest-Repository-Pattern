import React from 'react';
import { Descriptions, Space, Tag } from 'antd';
import { defaultSizeSpace } from '../../Utils/theme';
import { MainLayout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Section } from '../../Components/molecules/Section';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { DescriptionContainer } from '../../Components/molecules/DescriptionContainer';
import { formatDate } from '../../Utils/utils';

interface IProps extends TInertiaProps {
    data: IInAppNotification;
}

const DetailNotification: React.FC = (props: IProps) => {
    return (
        <MainLayout
            title="Detail Notification"
            breadcrumbs={Breadcrumbs.Notification.DETAIL}
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section>
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Title">
                            {props.data.title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Message">
                            {props.data.message}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At">
                            {formatDate(props.data.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Is Read">
                            {props.data.message ? (
                                <Tag color={'green'}>Read</Tag>
                            ) : (
                                <Tag color={'yellow'}>Unread</Tag>
                            )}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailNotification;
