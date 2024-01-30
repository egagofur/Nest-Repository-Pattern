import { IsNotEmpty, IsString } from 'class-validator';

export class ConfigEditRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    value: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    key: string;
}
