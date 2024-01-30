import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { ProfileController } from './controllers/profile.controller';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { ProfileService } from './services/profile.service';
import { User } from 'entities/iam/user.entity';
import { Role } from 'entities/iam/role.entity';
import { Permission } from 'entities/iam/permission.entity';
import { ProfilePasswordController } from './controllers/profile-password.controller';
import { ProfileRepository } from './repositories/profile.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission]), CacheModule],
    controllers: [ProfilePasswordController, ProfileController],
    providers: [InertiaAdapter, ProfileService, ProfileRepository],
})
export class ProfileModule {}
