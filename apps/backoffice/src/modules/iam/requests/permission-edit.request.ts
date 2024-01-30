import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionEditRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    key: string;
}
