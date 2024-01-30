import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { AuthForgotPasswordApplication } from '../applications/auth-forgot-password.application';
import { UserConfirmForgotPasswordRequest } from '../requests/user-confirm-forgot-password.request';
import { UserForgotPasswordRequest } from '../requests/user-forgot-password.request';

@Controller('auth')
export class ForgotPasswordController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly authApplication: AuthForgotPasswordApplication,
    ) {}

    @Get('forgot-password')
    async forgotPasswordPage(): Promise<null> {
        return this.inertiaAdapter.render('ForgotPassword');
    }

    @Get('change-password')
    async changePasswordPage(): Promise<null> {
        return this.inertiaAdapter.render('ChangePassword');
    }

    @Post('forgot-password')
    async forgotPassword(
        @Body() req: UserForgotPasswordRequest,
    ): Promise<void> {
        await this.authApplication.forgotPassword(req);
        return this.inertiaAdapter.successResponse(
            '/auth/login',
            'Check your email',
        );
    }

    @Post('confirm-forgot-password')
    async confirmForgotPassword(
        @Query('email') email: string,
        @Query('otp_code') otpCode: string,
        @Body() req: UserConfirmForgotPasswordRequest,
    ): Promise<void> {
        await this.authApplication.changePassword(email, otpCode, req);
        return this.inertiaAdapter.successResponse(
            '/auth/login',
            'Success change password',
        );
    }
}
