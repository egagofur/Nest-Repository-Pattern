import { InjectRepository } from '@nestjs/typeorm';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Movie } from 'entities/movie/movie.entity';
import { Repository } from 'typeorm';
import { MovieIndexRequest } from '../requests/movie-index.request';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IMovie } from 'interface-models/movie/movie.interface';
import { Injectable } from '@nestjs/common';

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
}
