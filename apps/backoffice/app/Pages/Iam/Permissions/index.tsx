import React from 'react';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaProps } from '../../../Modules/Inertia/Entities';
import { Tag } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { useModal } from '../../../Utils/modal';

import { PermissionResponse } from '../../../../src/modules/iam/responses/permission.response';
import { RoleResponse } from '../../../../src/modules/iam/responses/role.response';
import type { ColumnsType } from 'antd/es/table';
import { useTableFilter } from '../../../Utils/hooks';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { RowActionButtons } from 'apps/backoffice/app/Components/molecules/RowActionButtons';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { Route } from 'apps/backoffice/app/Common/Route/Route';
import { Inertia } from '@inertiajs/inertia';

interface IProps extends TInertiaProps {
    data: PermissionResponse[];
}

const PermissionPage: React.FC = (props: IProps) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter();

    const handleDetail = (id: number) => {
        return Inertia.get(`${Route.Permissions}/${id}`);
    };

    const columns: ColumnsType<PermissionResponse> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Permission Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'name',
                order: filters.order,
                sort: filters.sort,
            }),
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'roles',
                order: filters.order,
                sort: filters.sort,
            }),
            render: (roles: RoleResponse[]) =>
                roles?.map((role, index) => <Tag key={index}>{role.name}</Tag>),
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            sorter: true,
        },
        {
            title: 'Action',
            key: 'action',
            width: '142px',
            render: (text, record) => {
                const id = record.id;
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: `#`,
                                title: 'view',
                                onClick: () => handleDetail(id),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const handleBatchDelete = (selectedRowKeys) => {
        Inertia.post(`/permissions/deletes`, {
            ids: selectedRowKeys,
        });
    };

    const handleCancel = () => {
        // TODO: Replace with actual cancel logic
        console.log('cancel');
    };

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                useModal({
                    title: 'Are You Sure? ',
                    type: 'confirm',
                    onOk: () => handleBatchDelete(selectedRowKeys),
                    onCancel: handleCancel,
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            breadcrumbs={Breadcrumbs.Permissions.INDEX}
            title="Permissions"
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                onChange={implementTableFilter}
                columns={columns}
                search={filters.search}
                dataSource={props?.data}
                rowKey="id"
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
            />
        </MainLayout>
    );
};

export default PermissionPage;
