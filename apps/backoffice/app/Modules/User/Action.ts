import { route, Route } from '../../Common/Route/Route';
import { Inertia } from '@inertiajs/inertia';
import { IUserForm } from './Entities';

export const createUser = (userData: IUserForm): void => {
    Inertia.post(Route.UserCreate, userData);
};

export const editUser = (userId: number, userData: IUserForm): void => {
    Inertia.put(route(Route.UserEdit, { id: userId }), userData);
};

export const deleteUser = (userId: number): void => {
    Inertia.post(route(Route.UserDelete, { id: userId }), {});
};

export const deleteBatchUsers = (userIds: React.Key[]): void => {
    Inertia.post(Route.UserDeleteBatch, {
        ids: userIds,
    });
};
