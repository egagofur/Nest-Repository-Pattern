import { IMovieSchedule } from 'interface-models/movie-schedule/movie-schedule.interface';
import { ScheduleResponse } from '../responses/schedule.response';

export class ScheduleMapper {
    public static fromEntity = (
        schedule: IMovieSchedule,
    ): ScheduleResponse => ({
        id: schedule.id,
        movieId: schedule.movieId,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        price: schedule.price,
        date: schedule.date,
    });
}
