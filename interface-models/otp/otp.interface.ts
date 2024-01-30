import { IBaseEntity } from 'interface-models/base-entity.interface';

export interface IOtp extends IBaseEntity {
    id: number;

    code: string;

    trial: number;

    identifier: string;

    isValid: boolean;

    expiredAt?: Date;
}
