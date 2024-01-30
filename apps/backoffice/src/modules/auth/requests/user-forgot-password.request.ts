import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserForgotPasswordRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsEmail()
    email: string;
}
