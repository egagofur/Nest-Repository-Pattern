import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class UserConfirmForgotPasswordRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    @MinLength(8)
    @Matches('(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$', '', {
        message: 'password too weak, min 1 number & 1 alphabet ',
    })
    password: string;
}
