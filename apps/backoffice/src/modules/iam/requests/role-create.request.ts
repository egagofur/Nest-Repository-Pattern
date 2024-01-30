import { IsNotEmpty, IsString } from 'class-validator';

export class RoleCreateRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    key: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    permissions: number[];
}
