import { HttpException, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import { QueryFailedError } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IAMModule } from './modules/iam/iam.module';
import { CacheModule as CacheModuleManager } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOption } from 'apps/graphql/src/infrastructure/databases';
import { CacheModule } from './infrastructure/cache/cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { EntityNotFoundExceptionFilter } from './common/filters/http-exeception.filter';
import { QueryExceptionFilter } from './common/filters/query-failed-error.filter';

@Module({
    imports: [
        CacheModuleManager.register({
            isGlobal: true,
            buildSchemaOptions: {
                dateScalarMode: 'timestamp',
            },
        }),

        TypeOrmModule.forRoot(connectionOption),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'apps/graphql/assets/schema.gql',
        }),

        CacheModule,
        RavenModule,
        IAMModule,
        AuthModule,
    ],
    providers: [
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: QueryExceptionFilter,
        },
        {
            // Not Found Entity Error Handler
            provide: APP_FILTER,
            useClass: EntityNotFoundExceptionFilter,
        },
        {
            // Validation formatting response
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            // Sentry configuration
            provide: APP_INTERCEPTOR,
            useValue: new RavenInterceptor({
                filters: [
                    {
                        type: HttpException,
                        filter: (exception: HttpException) =>
                            500 > exception.getStatus(),
                    },
                    {
                        type: QueryFailedError,
                        filter: () => false,
                    },
                ],
            }),
        },
    ],
})
export class AppModule {}
