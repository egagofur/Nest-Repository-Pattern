import { IUser } from 'interface-models/iam/user.interface';

export class UserResponse {
    id: number;
    name: string;

    static fromEntity(data: IUser): UserResponse {
        const userResponse = <UserResponse>{};
        userResponse.name = data.fullname;

        return userResponse;
    }
}
