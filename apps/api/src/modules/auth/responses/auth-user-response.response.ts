import { Expose } from 'class-transformer';
import { IUser } from 'interface-models/iam/user.interface';

export class AuthUserResponse {
    id: number;

    fullname: string;

    email: string;

    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    static fromEntity(user: IUser): AuthUserResponse {
        return {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };
    }
}
