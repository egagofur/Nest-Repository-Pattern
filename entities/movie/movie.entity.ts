import { BaseEntity } from 'entities/base.entity';
import { IMovie } from 'interface-models/movie/movie.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie extends BaseEntity implements IMovie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    overview: string;

    @Column()
    poster: string;

    @Column({ name: 'play_until' })
    playUntil: Date;
}
