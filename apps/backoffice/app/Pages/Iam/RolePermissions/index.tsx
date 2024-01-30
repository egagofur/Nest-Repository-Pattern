import React from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import { CellProps, Column } from 'react-table';

import { MainLayout } from '../../../Layouts/MainLayout';

// import { useDidUpdateEffect } from '../../../Utils/hooks';
// import { confirmDelete, notifyError, notifySuccess } from '../../../Utils/utils';

// import { EndpointRoute, Route } from '../../../Enums/Route';

// import { ErrorType, SuccessType } from '../../../modules/Common/Entity/Common';
// import { PERMISSION_BACKOFFICE_DELETE_ROLE_PERMISSION, PERMISSION_BACKOFFICE_CREATE_ROLE_PERMISSION, PERMISSION_BACKOFFICE_DETAIL_ROLE_PERMISSION, PERMISSION_BACKOFFICE_UPDATE_ROLE_PERMISSION } from '../../../../../../constants/permission.constant';

// import { FilterSelectOption } from '../../../Components/molecules/Inputs/FilterSelect.molecule';
// import ActionButtons from '../../../Components/molecules/DataTable/ActionButtons.molecule';
// import DataTable from '../../../Components/organisms/DataTable/DataTable';
// import HeaderText from '../../../Components/molecules/Text/HeaderText.molecule';

// import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
// import { usePage } from '@inertiajs/inertia-react';
// import { RolePermissionResponse } from '../../../../src/modules/iam/responses/role-permission.response';

// type RolePermissionsPageProps = {
//     data: RolePermissionResponse[];
//     meta: IPaginationMeta;
// };

// const title = 'Daftar Role Permission';

// const filterOptions = [
//     {
//         label: 'Latest',
//         value: 'latest DESC',
//     },
//     {
//         label: 'Oldest',
//         value: 'oldest ASC',
//     },
//     {
//         label: 'Alphabet A-Z',
//         value: 'name ASC',
//     },
//     {
//         label: 'Alphabet Z-A',
//         value: 'name DESC',
//     },
// ];

const RolePermissionsPage: React.FC = () => {
    return (
        <MainLayout title="Role Permission" breadcrumbs={[]}>
            <h1>Hello</h1>
        </MainLayout>
    );
};

export default RolePermissionsPage;
