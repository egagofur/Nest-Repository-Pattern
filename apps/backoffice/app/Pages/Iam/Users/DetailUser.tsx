import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Descriptions, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { MainLayout } from '../../../Layouts/MainLayout';
import { IUser } from '../../../Modules/User/Entities';
import { defaultSizeSpace } from '../../../Utils/theme';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Button } from '../../../Components/atoms/Button';
import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../../Components/molecules/Section';
import { route, Route } from 'apps/backoffice/app/Common/Route/Route';
import { useModal } from 'apps/backoffice/app/Utils/modal';
import { deleteUser } from 'apps/backoffice/app/Modules/User/Action';
interface IProps extends TInertiaProps {
    data: IUser;
}

const UserDetailPage: React.FC = (props: IProps) => {
    const { id, identityNumber, email, fullname, phoneNumber, gender } =
        props.data;

    const handleDelete = (): void => {
        useModal({
            title: 'Are You Sure? ',
            type: 'confirm',
            variant: 'danger',
            onOk: () => deleteUser(id),
        });
    };

    return (
        <MainLayout
            title="Detail User"
            breadcrumbs={Breadcrumbs.Users.DETAIL}
            topActions={
                <>
                    <Button icon={<DeleteOutlined />} onClick={handleDelete}>
                        Delete
                    </Button>
                    <Link href={route(Route.UserEdit, { id })}>
                        <Button icon={<EditOutlined />}>Edit</Button>
                    </Link>
                </>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="User Info">
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {fullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="No Telephone">
                            {phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {email}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>

                <Section title="Advanced Information">
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="Identity Number">
                            {identityNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                            {gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address Link" span={2}>
                            http://collateral.dot.co.id/resources/contracts/new?viaResource=collaterals&viaResourceId=11927&viaRelationship=contracts
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default UserDetailPage;
