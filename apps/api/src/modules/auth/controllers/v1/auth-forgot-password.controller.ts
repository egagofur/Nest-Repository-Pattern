import { Body, Controller, Post } from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { AuthForgotPasswordApplication } from '../../applications/auth-forgot-password.application';
import { AuthOtpApplication } from '../../applications/auth-otp.application';
import { AuthConfirmForgotPasswordDto } from '../../dto/auth-confirm-forgot-password.dto';
import { AuthForgotPasswordDto } from '../../dto/auth-forgot-password.dto';
import { AuthLoginResponse } from '../../responses/auth-login.response';

@Controller('auth')
export class AuthForgotPasswordController {
    constructor(
        private readonly authForgotPasswordApplication: AuthForgotPasswordApplication,
        private readonly authOtpApplication: AuthOtpApplication,
    ) {}

    @Post('forgot-password')
    async forgotPassword(
        @Body() data: AuthForgotPasswordDto,
    ): Promise<IApiResponse<null>> {
        await this.authForgotPasswordApplication.forgotPassword(data);
        return {
            data: null,
            message: 'Success request forgot password',
        };
    }

    @Post('confirm-change-password')
    async changePasswrod(
        @Body() data: AuthConfirmForgotPasswordDto,
    ): Promise<IApiResponse<AuthLoginResponse>> {
        await this.authOtpApplication.confirmForgotPassword({
            phoneNumber: data.phoneNumber,
            code: data.otpCode,
        });

        await this.authForgotPasswordApplication.changePassword(data);
        return {
            data: null,
            message: 'Change password success',
        };
    }
}
