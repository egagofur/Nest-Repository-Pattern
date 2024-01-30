import { UserCreateRequest } from 'apps/backoffice/src/modules/iam/requests/user-create.request';
import { UserResponse } from 'apps/backoffice/src/modules/iam/responses/user.response';
import { ProfileResponse } from 'apps/backoffice/src/modules/profile/responses/profile.response';

type IUser = UserResponse;

type IUserForm = Omit<UserCreateRequest, 'roles'>;

type IProfile = ProfileResponse;

export { IUser, IProfile, IUserForm };
