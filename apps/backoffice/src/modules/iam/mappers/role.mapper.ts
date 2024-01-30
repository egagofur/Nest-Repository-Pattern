import { IRole } from 'interface-models/iam/role.interface';
import { RoleResponse } from '../responses/role.response';

export class RoleMapper {
    public static fromEntity = (role: IRole): RoleResponse => ({
        id: role.id,
        name: role.name,
        key: role.key,
        permissions: role.permissions,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        deletedAt: role.deletedAt,
    });
}
