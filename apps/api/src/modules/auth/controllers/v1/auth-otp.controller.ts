import { Body, Controller, Param, Post } from '@nestjs/common';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { AuthLoginApplication } from '../../applications/auth-login.application';
import { AuthOtpApplication } from '../../applications/auth-otp.application';
import { AuthConfirmOtpRegister } from '../../dto/auth-confirm-otp-register.dto';
import { AuthResendOtpByPhone } from '../../dto/auth-resend-otp-by-phone.dto';
import { AuthLoginResponse } from '../../responses/auth-login.response';
import { AuthUserResponse } from '../../responses/auth-user-response.response';

@Controller('auth')
export class AuthOtpController {
    constructor(
        private readonly authOtpApplication: AuthOtpApplication,
        private readonly authLoginApplication: AuthLoginApplication,
    ) {}

    @Post('resend-otp/:type')
    async resendOtp(
        @Param('type') type: 'register' | 'forgot-password',
        @Body() data: AuthResendOtpByPhone,
    ): Promise<IApiResponse<string>> {
        if (type == 'register' || type == 'forgot-password') {
            await this.authOtpApplication.createNewCodeByPhone(data);
            return {
                data: null,
                message: 'Success resend otp',
            };
        } else {
            return {
                data: null,
                message: 'Unknown method',
            };
        }
    }

    @Post('confirm-otp/:type')
    async registerUser(
        @Param('type') type: 'register' | 'forgot-password',
        @Body() data: AuthConfirmOtpRegister,
    ): Promise<IApiResponse<string | AuthLoginResponse>> {
        if (type == 'register') {
            await this.authOtpApplication.confirmRegister(data);
            const userWithToken =
                await this.authLoginApplication.createTokenByPhoneNumber(
                    data.phoneNumber,
                );
            return {
                data: {
                    user: AuthUserResponse.fromEntity(userWithToken.user),
                    token: userWithToken.token,
                },
                message: 'Success confirm register',
            };
        } else if (type == 'forgot-password') {
            await this.authOtpApplication.confirmForgotPassword(data, true);
            return {
                data: null,
                message: 'Confirmed code',
            };
        } else {
            return {
                data: null,
                message: 'Unknown method',
            };
        }
    }
}
