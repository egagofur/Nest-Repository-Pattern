import {
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { GenderEnum } from 'interface-models/iam/user.interface';

export class ProfileEditRequest {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('ID')
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    identityNumber: string;

    @IsOptional()
    @IsString()
    @IsEnum(GenderEnum)
    gender: GenderEnum;

    @IsOptional()
    @IsDate()
    birthDate: Date;
}
