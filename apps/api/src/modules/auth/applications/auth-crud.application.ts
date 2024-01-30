import { Injectable } from '@nestjs/common';
import { IUser } from 'interface-models/iam/user.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthCrudApplication {
    constructor(private readonly userService: AuthService) {}

    async findById(id: number): Promise<IUser> {
        return await this.userService.findById(id);
    }
}
