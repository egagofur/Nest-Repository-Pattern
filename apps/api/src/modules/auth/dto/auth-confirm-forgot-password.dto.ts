import { Expose } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumberString,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class AuthConfirmForgotPasswordDto {
    @IsNotEmpty()
    @Matches('^62[0-9]{9,13}$', '', {
        message: 'Should start with 62, min 10 and max 13 digit (exclude 62)',
    })
    @IsNumberString()
    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'password' })
    @MinLength(8)
    @Matches('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$', '', {
        message: 'password too weak, min 1 number & 1 alphabet ',
    })
    password: string;

    @IsNotEmpty()
    @Expose({ name: 'otp_code' })
    otpCode: string;
}
