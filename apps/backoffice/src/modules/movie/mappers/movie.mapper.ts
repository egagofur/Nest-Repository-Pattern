import { IMovie } from 'interface-models/movie/movie.interface';
import { MovieResponse } from '../responses/movie.response';

export class MovieMapper {
    public static fromEntity = (movie: IMovie): MovieResponse => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster,
        playUntil: movie.playUntil,
    });
}
