import { Inertia } from '@inertiajs/inertia';
import { IMovie } from './Entities';
import { Route, route } from '../../Common/Route/Route';

export const createMovieService = async (data: IMovie): Promise<void> => {
    Inertia.post(Route.MovieCreate, data);
};

export const updateMovieService = async (
    id: number,
    data: IMovie,
): Promise<void> => {
    Inertia.put(route(Route.MovieEdit, { id }), data);
};

export const deleteMovieService = async (id: number): Promise<void> => {
    Inertia.delete(route(Route.MovieDelete, { id }));
};
