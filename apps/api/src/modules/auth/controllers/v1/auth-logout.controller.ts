import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { AuthLogoutApplication } from '../../applications/auth-logout.application';
import { AuthLogoutDto } from '../../dto/auth-logout.dto';
import { LoggedInGuard } from '../../guards/logged-in.guard';
import { AuthLogoutResponse } from '../../responses/auth-logout.response';

@Controller('auth')
@UseGuards(LoggedInGuard)
export class AuthLogoutController {
    constructor(
        private readonly authLogoutApplication: AuthLogoutApplication,
    ) {}

    @Post('logout')
    async logout(
        @Body() data: AuthLogoutDto,
    ): Promise<IApiResponse<AuthLogoutResponse>> {
        const userLogout = await this.authLogoutApplication.logout(
            data.oneSignalPlayerId,
        );
        return {
            data: {
                id: userLogout['id'],
            },
            message: 'Logout Successfully',
        };
    }
}
