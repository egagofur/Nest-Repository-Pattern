import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthCrudApplication } from '../../auth/applications/auth-crud.application';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';

@Injectable()
export class UserSerializer extends PassportSerializer {
    constructor(private readonly authCrudApplication: AuthCrudApplication) {
        super();
    }

    serializeUser(user: User, done: (err: Error, user: IUser) => void) {
        done(null, user);
    }

    async deserializeUser(
        payload: IUser,
        done: (err: Error, user: Omit<IUser, 'password'>) => void,
    ) {
        const user = await this.authCrudApplication.findById(payload.id);
        done(null, user);
    }
}
