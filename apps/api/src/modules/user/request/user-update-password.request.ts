import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class UserUpdatePasswordRequest {
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'old_password' })
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$', '', {
        message: 'password too weak, min 1 number & 1 alphabet ',
    })
    @Expose({ name: 'new_password' })
    newPassword: string;
}
