import { IBaseEntity } from 'interface-models/base-entity.interface';
export interface IMovieScheduleInterface extends IBaseEntity {
    id: number;
    movieId: number;
    startTime: string;
    endTime: string;
    price: number;
    date: Date;
}
