import { Injectable } from '@nestjs/common';
import { config } from 'apps/backoffice/src/config';
import { CacheClear } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-clear.decorator';
import { IUser } from 'interface-models/iam/user.interface';
import { QueryFailedError } from 'typeorm';
import { ProfileRepository } from '../repositories/profile.repository';
import { ProfileEditRequest } from '../requests/profile-edit.request';
import { ProfileEditPasswordRequest } from '../requests/profile-edit-password.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) {}

    async findOneById(id: number): Promise<IUser> {
        return await this.profileRepository.findOneOrFail({
            where: { id },
        });
    }

    @CacheClear(config.cache.name.users.list)
    async update(id: number, request: ProfileEditRequest): Promise<IUser> {
        const updatedUser = await this.profileRepository.update(
            { id },
            {
                fullname: request.fullname,
                email: request.email,
                phoneNumber: request.phoneNumber,
                identityNumber: request.identityNumber,
                gender: request.gender,
                birthDate: request.birthDate,
            },
        );

        if (updatedUser.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return await this.findOneById(id);
    }

    async updatePassword(
        id: number,
        request: ProfileEditPasswordRequest,
    ): Promise<IUser> {
        const newPassword = await bcrypt.hash(request.password, 10);

        const updatedUser = await this.profileRepository.update(id, {
            password: newPassword,
        });

        if (updatedUser.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return await this.findOneById(id);
    }
}
