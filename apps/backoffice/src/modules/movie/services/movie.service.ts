import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MovieRepository } from '../repositories/movie.repository';
import { MovieIndexRequest } from '../requests/movie-index.request';
import { IMovie } from 'interface-models/movie/movie.interface';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { MovieCreateRequest } from '../requests/movie-create.request';
import { MovieUpdateRequest } from '../requests/movie-update.request';

@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository) {}

    async pagination(
        request: MovieIndexRequest,
    ): Promise<IPaginateResponse<IMovie>> {
        return this.movieRepository.pagination(request);
    }

    async findById(id: number): Promise<IMovie> {
        return this.movieRepository.findById(id);
    }

    async create(movie: MovieCreateRequest): Promise<void> {
        const movieExists = await this.movieRepository.isMovieExist(
            movie.title,
        );

        if (movieExists) {
            throw new UnprocessableEntityException(
                `Movie ${movie.title} has already exists`,
            );
        }

        this.movieRepository.createMovie(movie);
    }

    async update(id: number, movie: MovieUpdateRequest): Promise<void> {
        this.movieRepository.updateMovie(id, movie);
    }

    async delete(id: number): Promise<void> {
        this.movieRepository.deleteMovie(id);
    }
}
