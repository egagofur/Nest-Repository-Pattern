import React from 'react';

import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { Link } from '@inertiajs/inertia-react';
import { Descriptions, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { IUser } from '../../../Modules/User/Entities';

import { defaultSizeSpace, iconActionTableStyle } from '../../../Utils/theme';

import { Button } from '../../../Components/atoms/Button';
import { DataTable } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import DescriptionContainer from '../../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section, SectionHeader } from '../../../Components/molecules/Section';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';

const columns: ColumnsType<IUser> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: 'Identity Number',
        dataIndex: 'identityNumber',
        key: 'identityNumber',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Action',
        key: 'action',
        width: '142px',
        render: () => (
            <Space size="large">
                <Link href="#">
                    <EyeOutlined style={iconActionTableStyle} />
                </Link>
                <Link href="#">
                    <EditOutlined style={iconActionTableStyle} />
                </Link>
                <Link href="#">
                    <DeleteOutlined style={iconActionTableStyle} />
                </Link>
            </Space>
        ),
    },
];

const data: IUser[] = [
    {
        id: 1,
        fullname: 'John Cena',
        email: 'john@cena.com',
        phoneNumber: '0841231322',
        identityNumber: '231',
    },
    {
        id: 2,
        fullname: 'John Wick',
        email: 'john@wick.com',
        identityNumber: '231',
        phoneNumber: '0841231322',
    },
    {
        id: 3,
        fullname: 'John LBF',
        email: 'john@lbf.com',
        identityNumber: '231',
        phoneNumber: '0841231322',
    },
];

const DetailBasicPage: React.FC = (props: TInertiaProps) => {
    return (
        <MainLayout
            title="Detail User"
            breadcrumbs={Breadcrumbs.Users.DETAIL}
            topActions={
                <>
                    <Button icon={<DeleteOutlined />}>Delete</Button>
                    <Button icon={<EditOutlined />}>Edit</Button>
                    <Button icon={<DownloadOutlined />}>Download</Button>
                    <Button type="primary">Action</Button>
                </>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="User Info">
                    <DescriptionContainer size="small" bordered>
                        <Descriptions.Item label="ID">2</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            John Cena
                        </Descriptions.Item>
                        <Descriptions.Item label="No Telephone">
                            +628521341231
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            john@cena.com
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>

                <Section title="Advanced Information">
                    <DescriptionContainer size="small" bordered>
                        <Descriptions.Item label="ID">2</Descriptions.Item>
                        <Descriptions.Item label="Name">
                            John Cena
                        </Descriptions.Item>
                        <Descriptions.Item label="Address Link" span={2}>
                            http://collateral.dot.co.id/resources/contracts/new?viaResource=collaterals&viaResourceId=11927&viaRelationship=contracts
                        </Descriptions.Item>
                    </DescriptionContainer>

                    <SectionHeader
                        title="Table Title"
                        actions={<Button type="primary">Add Data</Button>}
                    />

                    <DataTable<IUser>
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={paginationTransform(props.meta)}
                    />
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailBasicPage;
