import { IMovieSchedule } from 'interface-models/movie-schedule/movie-schedule.interface';

export type ScheduleResponse = Omit<IMovieSchedule, ''>;
