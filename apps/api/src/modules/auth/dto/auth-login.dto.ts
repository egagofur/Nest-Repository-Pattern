import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

export class AuthLoginDto {
    @IsNotEmpty()
    @IsNumberString()
    @Matches('^62[0-9]{9,13}$', '', {
        message: 'Should start with 62, min 10 and max 13 digit (exclude 62)',
    })
    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
