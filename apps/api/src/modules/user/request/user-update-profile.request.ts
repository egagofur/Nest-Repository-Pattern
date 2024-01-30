import { Expose } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { GenderEnum } from 'interface-models/iam/user.interface';

export class UserUpdateProfileRequest {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsOptional()
    @IsDate()
    @Expose({ name: 'birth_date' })
    birthDate?: Date;

    @IsEnum([GenderEnum.Perempuan, GenderEnum.LakiLaki])
    @IsOptional()
    gender?: GenderEnum;
}
