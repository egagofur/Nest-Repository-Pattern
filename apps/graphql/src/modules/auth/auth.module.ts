import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'entities/iam/permission.entity';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { config } from '../../config';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { AuthLoginApplication } from './applications/auth-login.application';
import { AuthLoginResolver } from './resolvers/auth-login.resolver';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Permission]),
        JwtModule.registerAsync({
            imports: [],
            useFactory: async () => ({
                secret: config.auth.jwt.secret,
                signOptions: {
                    expiresIn: `${config.auth.jwt.timeExpired.year} years`,
                },
            }),
            inject: [],
        }),
        CacheModule,
    ],
    providers: [AuthLoginApplication, AuthService, AuthLoginResolver],
})
export class AuthModule {}
