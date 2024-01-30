import { IUser } from './user.interface';

export interface IUserWithToken {
    user: IUser;

    token?: string;
}
