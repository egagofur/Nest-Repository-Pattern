import React from 'react';

import { Descriptions, Space } from 'antd';
import { defaultSizeSpace } from '../../Utils/theme';
import { MainLayout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import DescriptionContainer from '../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../Components/molecules/Section';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import ReactJson from 'react-json-view';
import { formatDate } from '../../Utils/utils';

interface IProps extends TInertiaProps {
    data: ILogActivity;
}

const DetailLogActivity: React.FC = (props: IProps) => {
    const { id, user, source, metaData, activity, menu, path, createdAt } =
        props.data;

    return (
        <MainLayout
            title="Detail Log"
            breadcrumbs={Breadcrumbs.LogActivity.DETAIL}
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
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Source">
                            {source}
                        </Descriptions.Item>
                        <Descriptions.Item label="Activity">
                            {activity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Menu">
                            {menu}
                        </Descriptions.Item>
                        <Descriptions.Item label="Path">
                            {path}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At">
                            {formatDate(createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="User">
                            {user ? <ReactJson src={user} /> : '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Meta Data">
                            {metaData ? <ReactJson src={metaData} /> : '-'}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailLogActivity;
