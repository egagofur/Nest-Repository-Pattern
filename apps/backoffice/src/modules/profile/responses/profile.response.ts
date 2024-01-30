import { OmitType } from '@nestjs/swagger';
import { User } from 'entities/iam/user.entity';
import { IUser } from 'interface-models/iam/user.interface';

export class ProfileResponse extends OmitType(User, ['password']) {
    static fromEntity(entity: IUser): ProfileResponse {
        const response = new ProfileResponse();

        response.id = entity.id;
        response.roles = entity.roles;
        response.fullname = entity.fullname;
        response.email = entity.email;
        response.identityNumber = entity.identityNumber;
        response.phoneNumber = entity.phoneNumber;
        response.oneSignalPlayerIds = entity.oneSignalPlayerIds;
        response.emailVerifiedAt = entity.emailVerifiedAt;
        response.phoneNumberVerifiedAt = entity.phoneNumberVerifiedAt;
        response.gender = entity.gender;
        response.birthDate = entity.birthDate;

        return response;
    }
}
