import { IsNotEmpty, IsNumber } from 'class-validator';

export class RolePermissionEditRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsNumber()
    roleId: number;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsNumber()
    permissionId: number;
}
