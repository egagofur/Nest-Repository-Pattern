import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    password: string;
}
