import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthLoginApplication } from '../applications/auth-login.application';
import { AuthLoginRequest, AuthLoginResponse } from '../types/auth-login.type';

@Resolver()
export class AuthLoginResolver {
    constructor(private readonly authLoginApplication: AuthLoginApplication) {}

    @Query((_returns) => AuthLoginResponse)
    async loginBasic(@Args('authLoginRequest') data: AuthLoginRequest) {
        return await this.authLoginApplication.basic(data);
    }
}
