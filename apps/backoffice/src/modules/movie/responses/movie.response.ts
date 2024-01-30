import { IMovie } from 'interface-models/movie/movie.interface';

export type MovieResponse = Omit<IMovie, ''>;
