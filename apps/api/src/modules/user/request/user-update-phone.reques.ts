import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, Matches } from 'class-validator';

export class UserUpdatePhoneNumberRequest {
    @IsNotEmpty()
    @Matches('^62[0-9]{9,13}$', '', {
        message: 'Should start with 62, min 10 and max 13 digit (exclude 62)',
    })
    @IsNumberString()
    @Expose({ name: 'new_phone_number' })
    newPhoneNumber: string;
}
