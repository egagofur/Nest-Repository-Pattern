import { IBaseEntity } from 'interface-models/base-entity.interface';
import { IRole } from './role.interface';
import { IUser } from './user.interface';

export interface IUserRole extends IBaseEntity {
    id: number;

    role: IRole;

    user: IUser;
}
