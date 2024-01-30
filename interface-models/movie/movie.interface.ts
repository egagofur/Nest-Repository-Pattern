import { IBaseEntity } from 'interface-models/base-entity.interface';

export interface IMovie extends IBaseEntity {
    id: number;
    title: string;
    overview: string;
    poster: string;
    playUntil: Date;
}
