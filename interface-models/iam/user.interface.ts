import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IRole } from './role.interface';

export enum GenderEnum {
    Perempuan = 'FEMALE',
    LakiLaki = 'MALE',
}

export interface IUser extends IBaseEntity {
    id: number;

    roles?: IRole[];

    fullname: string;

    email: string;

    password: string;

    identityNumber: string;

    phoneNumber: string;

    oneSignalPlayerIds?: string[];

    emailVerifiedAt?: Date;

    phoneNumberVerifiedAt?: Date;

    gender?: GenderEnum;

    birthDate?: Date;
}
