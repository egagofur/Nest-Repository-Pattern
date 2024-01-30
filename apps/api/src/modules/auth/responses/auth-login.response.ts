import { AuthUserResponse } from './auth-user-response.response';

export class AuthLoginResponse {
    user: AuthUserResponse;

    token: string;
}
