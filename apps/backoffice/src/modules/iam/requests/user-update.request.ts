import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';
import { IRole } from 'interface-models/iam/role.interface';

export class UserUpdateRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    fullname: string;

    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Field wajiib diisi' })
    phoneNumber: string;

    @IsNotEmpty({ message: 'Field wajiib diisi' })
    roles: IRole[];

    @IsOptional({ message: 'Field wajiib diisi' })
    @IsString()
    @MinLength(8)
    @Matches('(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$', '', {
        message: 'password too weak, min 1 number & 1 alphabet ',
    })
    password: string;
}
