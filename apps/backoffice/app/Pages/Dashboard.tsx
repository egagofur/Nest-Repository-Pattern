import React from 'react';
import { DataTable } from '../Components/organisms/DataTable';
import { MainLayout } from '../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../Modules/Inertia/Entities';
import { useModal } from '../Utils/modal';
import { Button, MenuProps, Select } from 'antd';
import { DatePicker } from '../Components/molecules/Pickers';
import { MultiFilterDropdown } from '../Components/molecules/Dropdowns';
import {
    FileExcelOutlined,
    QuestionCircleOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Form, Typography, Space } from 'antd';
import { useTableFilter } from '../Utils/hooks';

import { Breadcrumbs } from '../Common/Enums/Breadcrumb';
import { RowActionButtons } from '../Components/molecules/RowActionButtons';
import { paginationTransform } from '../Components/organisms/DataTable/DataTable';

type DataType = {
    birthDate: string;
    email: string;
    emailVerifiedAt: string;
    fullname: string;
    gender: string;
    id: number;
    identityNumber: string;
    oneSignalPlayerIds: string;
    password: string;
    phoneNumber: string;
    phoneNumberVerifiedAt: string;
};

interface IProps extends TInertiaProps {
    data: DataType[];
}

const DashboardPage: React.FC<IProps> = (props: IProps) => {
    const { implementTableFilter, filters } = useTableFilter();

    const columns: ColumnsType<DataType> = [
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
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
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
                <RowActionButtons
                    actions={[
                        {
                            type: 'view',
                            href: `#`,
                            title: 'view',
                        },
                        {
                            type: 'edit',
                            href: `#`,
                            title: 'edit',
                        },
                        {
                            type: 'delete',
                            title: 'delete',
                            onClick: () => {
                                // TODO : handle delete function
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    const batchActionMenus: MenuProps['items'] = [
        {
            key: '1',
            label: 'Delete',
            onClick: () =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'warning',
                    onOk: () => alert('Ok Delete'),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    const handleStatus = (data) => {
        console.log('DATa Status: ', data);
    };

    const [form] = Form.useForm<{ status: string }>();

    const handleFinish = (values) => {
        console.log('FINSIH : ', values);
    };

    return (
        <MainLayout
            title="Dashboard"
            breadcrumbs={Breadcrumbs.Dashboard.INDEX}
            topActions={
                <>
                    <Button
                        size="large"
                        icon={<FileExcelOutlined />}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        Import
                    </Button>
                    <Button size="large" type="primary">
                        New User
                    </Button>
                </>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    {
                        label: 'Status',
                        name: 'status',
                        render: () => (
                            <MultiFilterDropdown
                                form={form}
                                title="Filter"
                                initialValues={{ status: '' }}
                                onFinish={handleFinish}
                                onReset={() => console.log('Hello')}
                                fieldsForm={[
                                    <Form.Item
                                        label={
                                            <Space size="small">
                                                <Typography.Text>
                                                    Status
                                                </Typography.Text>{' '}
                                                <QuestionCircleOutlined
                                                    style={{
                                                        color: 'rgba(0, 0, 0, 0.45)',
                                                    }}
                                                />
                                                <Typography.Text
                                                    style={{
                                                        color: 'rgba(0, 0, 0, 0.45)',
                                                    }}
                                                >
                                                    (optional)
                                                </Typography.Text>
                                            </Space>
                                        }
                                        name="status"
                                        rules={[{ required: true }]}
                                    >
                                        <Select
                                            options={[
                                                {
                                                    label: 'Done',
                                                    value: 'done',
                                                },
                                                {
                                                    label: 'Pending',
                                                    value: 'pending',
                                                },
                                            ]}
                                            onChange={handleStatus}
                                            allowClear
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>,
                                    <Form.Item label="Status" name="status">
                                        <Select
                                            options={[
                                                {
                                                    label: 'Done',
                                                    value: 'done',
                                                },
                                                {
                                                    label: 'Pending',
                                                    value: 'pending',
                                                },
                                            ]}
                                            onChange={handleStatus}
                                            allowClear
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>,
                                    <Form.Item label="Status" name="status">
                                        <Select
                                            options={[
                                                {
                                                    label: 'Done',
                                                    value: 'done',
                                                },
                                                {
                                                    label: 'Pending',
                                                    value: 'pending',
                                                },
                                            ]}
                                            onChange={handleStatus}
                                            allowClear
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>,
                                ]}
                            />
                        ),
                    },
                    {
                        label: 'Created At',
                        type: 'DateRangePicker',
                        name: 'rangeCreateAt',
                        range: 10,
                    },
                    {
                        label: 'Date',
                        name: 'date',
                        render: DatePicker,
                    },
                ]}
                onChange={implementTableFilter}
                columns={columns}
                dataSource={props?.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
            />
        </MainLayout>
    );
};

export default DashboardPage;
