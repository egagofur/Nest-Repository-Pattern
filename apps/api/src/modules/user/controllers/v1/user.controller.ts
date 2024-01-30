import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    OTP_UPDATE_EMAIL,
    OTP_UPDATE_PHONE_NUMBER,
} from 'apps/api/src/common/constants/otp.constant';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { LoggedInGuard } from '../../../auth/guards/logged-in.guard';
import { OptionalLoggedInGuard } from '../../../auth/guards/optional-logged-in.guard';
import { UserUpdateProfileRequest } from '../../../user/request/user-update-profile.request';
import { UserApplication } from '../../applications/user.application';
import { UserUpdateEmailRequest } from '../../request/user-update-email.request';
import { UserUpdatePasswordRequest } from '../../request/user-update-password.request';
import { UserUpdatePhoneNumberRequest } from '../../request/user-update-phone.reques';
import { UserResponse } from '../../responses/user.response';

@Controller('users')
export class UserController {
    constructor(private readonly userApplication: UserApplication) {}

    @Patch('profile/update')
    @UseGuards(LoggedInGuard)
    async profileUpdate(
        @Body() dataUser: UserUpdateProfileRequest,
    ): Promise<IApiResponse<UserResponse>> {
        const IsNullStringErr: Error = new BadRequestException(
            'Sorry, String Null Is Not Accepted',
        );

        if (String(dataUser.gender) === 'null') {
            throw IsNullStringErr;
        }

        if (String(dataUser.birthDate) === 'null') {
            throw IsNullStringErr;
        }

        const data = await this.userApplication.editUser(dataUser);

        return {
            data: data,
            message: 'User Update Successfully',
        };
    }

    @Patch('password/update')
    @UseGuards(LoggedInGuard)
    async passwordUpdate(
        @Body() dataUser: UserUpdatePasswordRequest,
    ): Promise<IApiResponse<UserResponse>> {
        await this.userApplication.changePassword(dataUser);
        return {
            data: null,
            message: 'User Update Successfully',
        };
    }

    @Patch('phone-number/update')
    @UseGuards(LoggedInGuard)
    async emailPhoneNumber(
        @Body() dataUser: UserUpdatePhoneNumberRequest,
    ): Promise<IApiResponse<UserResponse>> {
        await this.userApplication.sendPhoneNumberUpdateConfirmation(dataUser);
        return {
            data: null,
            message: 'SMS Sent Successfully',
        };
    }

    @Patch('email/update')
    @UseGuards(LoggedInGuard)
    async emailUpdate(
        @Body() dataUser: UserUpdateEmailRequest,
    ): Promise<IApiResponse<UserResponse>> {
        await this.userApplication.sendEmailUpdateConfirmation(dataUser);
        return {
            data: null,
            message: 'Email Sent Successfully',
        };
    }

    @Get('confirm-otp/:type/:otpCode')
    @UseGuards(OptionalLoggedInGuard)
    async comfirmOtp(
        @Param('type') type: string,
        @Param('otpCode') otpCode: string,
        @Query('new_identity') newIdentifier: string,
        @Query('identifier') identifier: string,
    ): Promise<IApiResponse<UserResponse>> {
        switch (type) {
            case OTP_UPDATE_EMAIL:
                await this.userApplication.updateEmailByIdentifierAndOtp(
                    identifier,
                    otpCode,
                    newIdentifier,
                );
                break;
            case OTP_UPDATE_PHONE_NUMBER:
                await this.userApplication.updatePhoneByOtp(
                    otpCode,
                    newIdentifier,
                );
                break;
            default:
                throw new BadRequestException('Wrong type');
        }

        return {
            data: null,
            message: 'User Update Successfully',
        };
    }

    @Patch('resend-otp/:type')
    @UseGuards(LoggedInGuard)
    async resendOtp(
        @Param('type') type: string,
        @Query('new_identity') newIdentity: string,
    ): Promise<IApiResponse<UserResponse>> {
        switch (type) {
            case OTP_UPDATE_EMAIL:
                await this.userApplication.resendOtpUpdateEmail(newIdentity);
                break;
            case OTP_UPDATE_PHONE_NUMBER:
                await this.userApplication.resendOtpUpdatePhone(newIdentity);
                break;
            default:
                throw new BadRequestException('Wrong type');
        }

        return {
            data: null,
            message: 'SMS Send Successfully',
        };
    }

    @Delete('account/delete')
    @UseGuards(LoggedInGuard)
    async accountDelete(): Promise<IApiResponse<UserResponse>> {
        await this.userApplication.accountDelete();
        return {
            data: null,
            message: 'Account Successfully Deleted',
        };
    }
}
