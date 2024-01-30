import { IBaseEntity } from 'interface-models/base-entity.interface';

export interface IConfig extends IBaseEntity {
    id: number;

    name: string;

    key: string;

    value: string;
}
