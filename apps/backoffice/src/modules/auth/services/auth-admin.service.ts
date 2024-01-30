import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';
import { Utils } from 'apps/backoffice/src/common/utils/util';

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectRepository(User)
        private readonly adminRepository: Repository<User>,
    ) {}

    async addOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        const admin = await this.adminRepository.findOneOrFail({
            where: { id },
        });
        if (admin.oneSignalPlayerIds?.length > 0) {
            admin.oneSignalPlayerIds = [...admin.oneSignalPlayerIds, playerId];
        } else {
            admin.oneSignalPlayerIds = [playerId];
        }

        await this.adminRepository.update(
            { id },
            {
                oneSignalPlayerIds: admin.oneSignalPlayerIds,
            },
        );
    }

    async updatePasswordByEmail(
        email: string,
        password: string,
    ): Promise<void> {
        const passwordHash = await Utils.bcryptHash(password);
        await this.adminRepository.update(
            { email },
            {
                password: passwordHash,
            },
        );
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.adminRepository.findOneOrFail({
            where: {
                email,
            },
        });
    }

    async removeOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        const admin = await this.adminRepository.findOneOrFail({
            where: { id },
        });
        if (admin.oneSignalPlayerIds?.length > 0) {
            const filteredPlayerId = admin.oneSignalPlayerIds.filter(
                (oldPlayerId) => {
                    return oldPlayerId != playerId;
                },
            );
            admin.oneSignalPlayerIds = [...filteredPlayerId];
        }

        await this.adminRepository.update(
            { id },
            {
                oneSignalPlayerIds: admin.oneSignalPlayerIds,
            },
        );
    }
}
