import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IRole } from './role.interface';

export interface IPermission extends IBaseEntity {
    id: number;

    name: string;

    key: string;

    roles?: IRole[];
}
