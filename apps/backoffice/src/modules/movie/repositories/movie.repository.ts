import { InjectRepository } from '@nestjs/typeorm';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Movie } from 'entities/movie/movie.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { MovieIndexRequest } from '../requests/movie-index.request';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IMovie } from 'interface-models/movie/movie.interface';
import { Injectable } from '@nestjs/common';
import { MovieCreateRequest } from '../requests/movie-create.request';
import { MovieUpdateRequest } from '../requests/movie-update.request';

@Injectable()
export class MovieRepository extends Repository<Movie> {
    constructor(
        @InjectRepository(Movie)
        private readonly repo: MovieRepository,
        private readonly paginateUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: MovieIndexRequest,
    ): Promise<IPaginateResponse<IMovie>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'title', 'playUntil'];

        const query = this.createQueryBuilder('movie');

        if (request.search) {
            query.where(
                `concat(movie.title, ' ', movie.overview, ' ', movie.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('movie.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('movie.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? request.sort
                        ? `movie.${request.sort}`
                        : `movie.${ALLOW_TO_SORT[0]}`
                    : `movie.createdAt`,
                this.paginateUtil.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginateUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginateUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async findById(id: number): Promise<IMovie> {
        return this.findOne({
            where: {
                id,
            },
        });
    }

    async findByTitle(title: string): Promise<IMovie> {
        return this.findOne({
            where: {
                title,
            },
        });
    }

    async isMovieExist(title: string): Promise<boolean> {
        const movie = await this.findByTitle(title);

        return !!movie;
    }

    async createMovie(data: MovieCreateRequest): Promise<void> {
        const movie = this.create(data);
        await this.save(movie);
    }

    async updateMovie(id: number, data: MovieUpdateRequest): Promise<void> {
        const status = await this.update(id, data);
        if (status.affected < 1) {
            throw new QueryFailedError('Error data not changed', null, null);
        }
    }

    async deleteMovie(id: number): Promise<void> {
        const status = await this.delete(id);
        if (status.affected < 1) {
            throw new QueryFailedError('Error data not deleted', null, null);
        }
    }
}
