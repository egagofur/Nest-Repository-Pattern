import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import type { ColumnsType } from 'antd/es/table';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { useModal } from '../../../Utils/modal';
import { Input, Tag } from 'antd';
import dayjs from 'dayjs';

import { ShareAltOutlined } from '@ant-design/icons';
import { GenderEnum } from '../../../../../../interface-models/iam/user.interface';
import { UserResponse } from '../../../../src/modules/iam/responses/user.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';

import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';

import { IUser } from '../../../Modules/User/Entities';
import { isMobileScreen } from '../../../Utils/utils';
import { route, Route } from 'apps/backoffice/app/Common/Route/Route';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';
import {
    deleteBatchUsers,
    deleteUser,
} from 'apps/backoffice/app/Modules/User/Action';

interface IProps extends TInertiaProps {
    data: UserResponse[];
}

type TFilters = {
    email?: string;
    gender?: string;
    created_at?: string;
    checkbox?: string;
};

const UsersPage: React.FC = (props: IProps) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<TFilters>();
    const isMobile = isMobileScreen();

    const columns: ColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['lg'],
        },
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'fullname',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (value) =>
                (isMobile && (value === 'male' ? 'm' : 'f')) || value,
            responsive: ['lg'],
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (value) => (isMobile ? '+62xxx' : value),
            responsive: ['lg'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: RoleResponse[]) =>
                roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>),
        },
        {
            title: isMobile ? null : 'Action',
            key: 'action',
            width: '142px',
            render: (text, record) => {
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: route(Route.UserDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.UserEdit, { id: record.id }),
                                title: 'edit',
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: () => {
                                    useModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        variant: 'danger',
                                        onOk: () => deleteUser(record.id),
                                    });
                                },
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const genderOptions = [
        { label: 'Pria', value: GenderEnum.LakiLaki },
        { label: 'Wanita', value: GenderEnum.Perempuan },
    ];

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                useModal({
                    title: 'Are You Sure?',
                    type: 'confirm',
                    variant: 'danger',
                    onOk: () => deleteBatchUsers(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    const defaultValueCreatedAt = filters.created_at
        ?.split(',')
        .map((date) => dayjs(date)) as [dayjs.Dayjs, dayjs.Dayjs];

    const defaultValueCheckbox = filters.checkbox?.split(',');

    return (
        <MainLayout
            title="User List"
            topActions={
                <Button href={Route.UserCreate} size="large" type="primary">
                    New User
                </Button>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                filterComponents={[
                    {
                        label: 'Checkbox',
                        type: 'CheckboxDropdown',
                        name: 'checkbox',
                        placeholder: 'Checkbox Dropdown',
                        options: [{ label: 'Checkbox 1', value: 'checkbox 1' }],
                        defaultValue: defaultValueCheckbox,
                    },
                    {
                        label: 'Email',
                        render: Input,
                        name: 'email',
                        placeholder: 'Search email',
                        defaultValue: filters.email,
                    },
                    {
                        label: 'Gender',
                        type: 'Select',
                        name: 'gender',
                        placeholder: 'Gender',
                        options: genderOptions,
                        defaultValue: filters.gender,
                    },
                    {
                        label: 'Created At',
                        type: 'DateRangePicker',
                        name: 'created_at',
                        range: 10,
                        defaultValue: defaultValueCreatedAt,
                    },
                ]}
                onChange={implementTableFilter}
                columns={columns}
                dataSource={props.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default UsersPage;
