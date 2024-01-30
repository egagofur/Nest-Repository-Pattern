import { Injectable } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { UserService } from '../services/user.service';
import { UpdateUserFullname } from '../types/user.type';

@Injectable()
export class UserCrudApplication {
    constructor(private readonly userService: UserService) {}

    async findById(id: number): Promise<IUser> {
        const results = await this.userService.findOneById(id);
        return results;
    }

    async getAll(limit = 10): Promise<IUser[]> {
        return await this.userService.findAll(limit);
    }

    async update(
        id: number,
        updateFullname: UpdateUserFullname,
    ): Promise<IUser> {
        this.userService.update(id, <IUser>{
            fullname: updateFullname.fullname,
        });

        return await this.findById(id);
    }
}
