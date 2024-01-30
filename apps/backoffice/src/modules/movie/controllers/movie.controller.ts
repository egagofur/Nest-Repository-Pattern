import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { MovieIndexRequest } from '../requests/movie-index.request';
import { MovieResponse } from '../responses/movie.response';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { MovieMapper } from '../mappers/movie.mapper';
import { IMovie } from 'interface-models/movie/movie.interface';
import { MovieCreateRequest } from '../requests/movie-create.request';

@Controller('movies')
export class MovieController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly movieService: MovieService,
    ) {}

    @Get()
    async indexPage(@Query() request: MovieIndexRequest): Promise<{
        data: MovieResponse[];
        meta: IPaginationMeta;
    }> {
        const movies = await this.movieService.pagination(request);

        return this.inertiaAdapter.render('Movie', {
            data: movies.data.map((movie) => MovieMapper.fromEntity(movie)),
            meta: movies.meta,
        });
    }

    @Get('create')
    async createPage(): Promise<IMovie> {
        return this.inertiaAdapter.render('Movie/FormMovie');
    }

    @Get('edit/:id')
    async editPage(@Param() id: number): Promise<{
        data: MovieResponse;
        isUpdate: boolean;
    }> {
        const movie = await this.movieService.findById(id);
        return this.inertiaAdapter.render('Movie/FormMovie', {
            data: MovieMapper.fromEntity(movie),
            isUpdate: true,
        });
    }

    @Post('create')
    async create(@Body() movieRequest: MovieCreateRequest): Promise<void> {
        await this.movieService.create(movieRequest);
        return this.inertiaAdapter.successResponse('movies', 'Movie created');
    }

    @Put('edit/:id')
    async update(
        @Param() id: number,
        @Body() movieRequest: MovieCreateRequest,
    ): Promise<void> {
        await this.movieService.update(id, movieRequest);
        return this.inertiaAdapter.successResponse('movies', 'Movie updated');
    }

    @Delete('delete/:id')
    async delete(@Param() id: number): Promise<void> {
        await this.movieService.delete(id);
        return this.inertiaAdapter.successResponse('movies', 'Movie deleted');
    }
}
