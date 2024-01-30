import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolePermissionCreateRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsNumber()
    @Expose({ name: 'role_id' })
    roleId: number;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsNumber()
    @Expose({ name: 'permission_id' })
    permissionId: number;
}
