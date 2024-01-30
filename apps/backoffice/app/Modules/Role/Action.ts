import { Inertia } from '@inertiajs/inertia';
import { IRole } from 'interface-models/iam/role.interface';
import { route, Route } from '../../Common/Route/Route';
import { IRoleForm } from './Entities';

export const createRole = (roleData: IRoleForm): void => {
    Inertia.post(Route.RoleCreate, roleData);
};

export const editRole = (roleData: IRoleForm, roleId: number): void => {
    Inertia.put(route(Route.RoleEdit, { id: roleId }), roleData);
};

export const deleteRole = (role: IRole): void => {
    Inertia.delete(route(Route.RoleDelete, { id: role.id }));
};
