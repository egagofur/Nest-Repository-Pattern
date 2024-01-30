import { IPermission } from 'interface-models/iam/permission.interface';
import { PermissionResponse } from '../responses/permission.response';

export class PermissionMapper {
    public static fromEntity = (
        permission: IPermission,
    ): PermissionResponse => ({
        id: permission.id,
        name: permission.name,
        key: permission.key,
        roles: permission.roles,
    });
}
