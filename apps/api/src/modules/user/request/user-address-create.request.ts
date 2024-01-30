/* eslint-disable @typescript-eslint/naming-convention */
import { Expose } from 'class-transformer';
import {
    IsBoolean,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsString,
    Matches,
} from 'class-validator';

export class AddUserAddressRequest {
    @IsNotEmpty()
    @IsString()
    mark: string;

    @IsString()
    @IsNotEmpty()
    @Expose({ name: 'address' })
    address: string;

    @IsNotEmpty()
    @IsLatitude()
    latitude: string;

    @IsNotEmpty()
    @IsLongitude()
    longitude: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches('^62[0-9]{9,13}$', '', {
        message: 'Should start with 62, min 10 and max 13 digit (exclude 62)',
    })
    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    @IsNotEmpty()
    @IsBoolean()
    @Expose({ name: 'is_primary' })
    isPrimary: boolean;

    @IsNotEmpty()
    @IsNumber()
    @Expose({ name: 'district_id' })
    districtId: number;
}
