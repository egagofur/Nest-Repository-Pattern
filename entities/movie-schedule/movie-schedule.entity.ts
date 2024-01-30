import { BaseEntity } from 'entities/base.entity';
import { Movie } from 'entities/movie/movie.entity';
import { IMovieScheduleInterface } from 'interface-models/movie-schedule/movie-schedule.interface';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'movie_schedules' })
export class MovieSchedule
    extends BaseEntity
    implements IMovieScheduleInterface
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Movie, (movie) => movie.id, { eager: true })
    @Column({ name: 'movie_id' })
    movieId: number;

    @Column({ name: 'start_time' })
    startTime: string;

    @Column({ name: 'end_time' })
    endTime: string;

    @Column()
    price: number;

    @Column()
    date: Date;
}
