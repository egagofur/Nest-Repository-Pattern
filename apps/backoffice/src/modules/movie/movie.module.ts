import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'entities/movie/movie.entity';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';
import { MovieRepository } from './repositories/movie.repository';
import { PaginateUtil } from '../../common/utils/paginate.util';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MovieService, MovieRepository, PaginateUtil, InertiaAdapter],
    controllers: [MovieController],
    exports: [MovieService],
})
export class MovieModule {}
