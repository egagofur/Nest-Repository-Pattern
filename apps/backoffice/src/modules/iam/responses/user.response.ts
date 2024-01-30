import { IUser } from 'interface-models/iam/user.interface';

export type UserResponse = Omit<IUser, 'password'>;
