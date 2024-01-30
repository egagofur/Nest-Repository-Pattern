import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IUser } from 'interface-models/iam/user.interface';
import { Strategy } from 'passport-local';
import { UserRepository } from '../../iam/repositories/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserRepository) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<IUser> {
        const user = await this.userService.validateUser(email, password);
        if (!user) {
            throw new BadRequestException(`Email or password is not valid!`);
        }

        return user;
    }
}
