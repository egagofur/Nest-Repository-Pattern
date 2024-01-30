import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CacheClear } from 'apps/api/src/infrastructure/cache/decorators/cache-clear.decorator';
import { config } from 'apps/api/src/config';
import { Utils } from 'apps/api/src/common/utils/util';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    @CacheClear(config.cache.name.users.detail)
    async create(data: IUser): Promise<IUser> {
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
    }

    @CacheClear(config.cache.name.users.detail)
    async addOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        const user = await this.userRepository.findOneOrFail({
            where: { id },
        });
        if (user.oneSignalPlayerIds?.length > 0) {
            // Jika playerId belum ada di list oneSignalPlayerIds, jika ada maka lewati
            if (!user.oneSignalPlayerIds.find((val) => val === playerId)) {
                user.oneSignalPlayerIds = [
                    ...user.oneSignalPlayerIds,
                    playerId,
                ];
            }
        } else {
            user.oneSignalPlayerIds = [playerId];
        }

        await this.userRepository.update(
            { id },
            {
                oneSignalPlayerIds: user.oneSignalPlayerIds,
            },
        );
    }

    async findByPhoneNumber(phoneNumber: string): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: {
                phoneNumber,
            },
            relations: ['role', 'role.permissions'],
        });
    }

    async findById(id: number): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['role', 'role.permissions'],
        });
    }

    async findByRoleExceptIds(roleId: number, ids: number[]): Promise<IUser[]> {
        return await this.userRepository.find({
            where: {
                id: Not(In(ids)),
                roles: {
                    id: roleId,
                },
            },
            relations: ['role', 'role.permissions'],
        });
    }

    @CacheClear(config.cache.name.users.detail)
    async updateEmailVerifiedAtByPhone(
        phoneNumber: string,
        dateNow: Date,
    ): Promise<void> {
        await this.findByPhoneNumber(phoneNumber);
        await this.userRepository.update(
            {
                phoneNumber,
            },
            {
                emailVerifiedAt: dateNow,
            },
        );
    }

    @CacheClear(config.cache.name.users.detail)
    async updatePhoneNumberVerifiedAtByPhone(
        phoneNumber: string,
        dateNow: Date,
    ): Promise<void> {
        await this.findByPhoneNumber(phoneNumber);
        await this.userRepository.update(
            {
                phoneNumber,
            },
            {
                phoneNumberVerifiedAt: dateNow,
            },
        );
    }

    @CacheClear(config.cache.name.users.detail)
    async updatePasswordByPhoneNumber(
        phoneNumber: string,
        password: string,
    ): Promise<void> {
        const passwordHash = await Utils.bcryptHash(password);
        await this.userRepository.update(
            { phoneNumber },
            {
                password: passwordHash,
            },
        );
    }

    async validateUser(phoneNumber: string, password: string): Promise<IUser> {
        const user = await this.findByPhoneNumber(phoneNumber);
        const isTrue = await bcrypt.compare(password, user.password);

        if (user && isTrue) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
            return user;
        }

        return null;
    }

    @CacheClear(config.cache.name.users.detail)
    async removeOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        const changer = await this.userRepository.findOneOrFail({
            where: { id },
        });
        if (changer.oneSignalPlayerIds?.length > 0) {
            const filteredPlayerId = changer.oneSignalPlayerIds.filter(
                (oldPlayerId) => {
                    return oldPlayerId != playerId;
                },
            );
            changer.oneSignalPlayerIds = [...filteredPlayerId];
        }

        await this.userRepository.update(
            { id },
            {
                oneSignalPlayerIds: changer.oneSignalPlayerIds,
            },
        );
    }
}
