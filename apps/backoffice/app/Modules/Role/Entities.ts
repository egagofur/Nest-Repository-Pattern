import { RoleCreateRequest } from 'apps/backoffice/src/modules/iam/requests/role-create.request';
import { RoleResponse } from 'apps/backoffice/src/modules/iam/responses/role.response';
import { UserResponse } from 'apps/backoffice/src/modules/iam/responses/user.response';

type IUser = UserResponse;

type IRoleForm = Omit<RoleCreateRequest, ''>;

type IRole = RoleResponse;

export { IUser, IRole, IRoleForm };
