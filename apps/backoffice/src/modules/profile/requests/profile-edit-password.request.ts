import { PickType } from '@nestjs/swagger';
import { IsMatch } from 'apps/backoffice/src/common/pipes/is-match.decorator';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { UserUpdateRequest } from '../../iam/requests/user-update.request';

export class ProfileEditPasswordRequest extends PickType(UserUpdateRequest, [
    'password',
]) {
    @IsNotEmpty({ message: 'Field wajiib diisi' })
    @IsString()
    @MinLength(8)
    @Matches('(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$', '', {
        message: 'password too weak, min 1 number & 1 alphabet ',
    })
    @IsMatch('password')
    passwordConfirm: string;
}
