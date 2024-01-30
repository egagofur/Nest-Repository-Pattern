import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    password: string;
}
