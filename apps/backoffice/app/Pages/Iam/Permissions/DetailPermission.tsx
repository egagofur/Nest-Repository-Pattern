import { Descriptions, Space } from 'antd';
import { IPermission } from 'interface-models/iam/permission.interface';
import React from 'react';

import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../../Components/molecules/Section';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { defaultSizeSpace } from '../../../Utils/theme';

interface IProps extends TInertiaProps {
    data: IPermission;
}

const DetailPermissionPage: React.FC = (props: IProps) => {
    const { key, name, roles, id } = props.data;

    return (
        <MainLayout
            title="Detail Permission"
            breadcrumbs={Breadcrumbs.Permissions.DETAIL}
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="Permission Info">
                    <DescriptionContainer size="small" bordered column={1}>
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Key">{key}</Descriptions.Item>
                        <Descriptions.Item label="Roles">
                            {roles.map((role) => role.name).join(', ')}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailPermissionPage;
