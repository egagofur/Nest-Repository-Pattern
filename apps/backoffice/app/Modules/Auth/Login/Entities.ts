import { User } from '../../../../../../entities/iam/user.entity';

export type TLogin = Pick<User, 'email' | 'password'>;
