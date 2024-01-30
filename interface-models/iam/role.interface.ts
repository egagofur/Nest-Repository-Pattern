import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IPermission } from './permission.interface';

export interface IRole extends IBaseEntity {
    id: number;

    name: string;

    key: string;

    permissions?: IPermission[];
}
