import { Inertia } from '@inertiajs/inertia';
import { Route, route } from '../../Common/Route/Route';
import { ISchedule } from './Entities';

export const createScheduleService = async (data: ISchedule): Promise<void> => {
    Inertia.post(Route.MovieScheduleCreate, data);
};

export const updateScheduleService = async (
    id: number,
    data: ISchedule,
): Promise<void> => {
    Inertia.put(route(Route.MovieScheduleEdit, { id }), data);
};

export const deleteScheuleService = async (id: number): Promise<void> => {
    Inertia.delete(route(Route.MovieScheduleDelete, { id }));
};
