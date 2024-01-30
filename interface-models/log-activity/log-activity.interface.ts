import { IUser } from '../iam/user.interface';

export interface ILogActivity {
    id?: number;

    user: IUser;

    source: string;

    metaData: any;

    activity: string;

    menu: string;

    path: string;

    createdAt?: Date;
}
