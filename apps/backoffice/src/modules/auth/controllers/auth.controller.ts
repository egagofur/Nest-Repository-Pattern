import {
    Controller,
    Get,
    Logger,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { Request, Response } from 'express';
import { AuthApplication } from '../applications/auth.application';
import { LocalGuard } from '../guards/local.guard';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { LoggedOutGuard } from '../guards/logged-out.guard';
import { OidcGuard } from '../guards/oidc.guard';
import { FailSafeCheck } from 'apps/backoffice/src/infrastructure/fail-safe/decorators/fail-safe.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly authApplication: AuthApplication,
    ) {}

    @Get('login')
    @FailSafeCheck()
    @UseGuards(LoggedOutGuard)
    async loginPage(): Promise<null> {
        return this.inertiaAdapter.render('Login');
    }

    @Get('sso-oidc/redirect')
    async SSOOIDCRedirectPage(): Promise<null> {
        return this.inertiaAdapter.render('SSORedirectPage');
    }

    @UseGuards(OidcGuard)
    @Get('sso-oidc/callback')
    async SSOOIDCCallbaack(@Res() res: Response): Promise<void> {
        return res.redirect('/');
    }

    @UseGuards(OidcGuard)
    @Get('sso-oidc')
    async loginSSOPage(): Promise<void> {
        Logger.log('[Redirect] to SSO Login Page');
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @Query('one_signal_player_id') playerId: string,
        @Req() req: Request,
    ): Promise<void> {
        const id = req.user['id'];
        await this.authApplication.loginAttempt(id, playerId);
        return this.inertiaAdapter.successResponse('/', 'Success Login');
    }

    @UseGuards(LoggedInGuard)
    @Get('logout')
    async logout(
        @Query('one_signal_player_id') playerId: string,
        @Res() res: Response,
    ): Promise<void> {
        await this.authApplication.logout(playerId);
        return res.redirect('/');
    }
}
