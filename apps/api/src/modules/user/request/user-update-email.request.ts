import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateEmailRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Expose({ name: 'new_email' })
    newEmail: string;
}
