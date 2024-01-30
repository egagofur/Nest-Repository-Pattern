import { Body, Controller, Post, Query } from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { AuthLoginApplication } from '../../applications/auth-login.application';
import { AuthLogoutApplication } from '../../applications/auth-logout.application';
import { AuthLoginDto } from '../../dto/auth-login.dto';
import { AuthLoginResponse } from '../../responses/auth-login.response';
import { AuthUserResponse } from '../../responses/auth-user-response.response';

@Controller('auth')
export class AuthLoginController {
    constructor(
        private readonly authLoginApplication: AuthLoginApplication,
        private readonly authLogoutApplication: AuthLogoutApplication,
    ) {}

    @Post('login')
    async loginBasic(
        @Query('one_signal_player_id') playerId: string,
        @Body() data: AuthLoginDto,
    ): Promise<IApiResponse<AuthLoginResponse>> {
        const dataLogin = await this.authLoginApplication.basic(data);
        await this.authLoginApplication.loginAttempt(
            dataLogin.user.phoneNumber,
            playerId,
        );

        return {
            data: {
                user: AuthUserResponse.fromEntity(dataLogin.user),
                token: dataLogin.token,
            },
            message: 'Login Successfully',
        };
    }
}
