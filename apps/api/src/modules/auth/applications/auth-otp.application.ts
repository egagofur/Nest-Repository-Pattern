import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthConfirmOtpRegister } from '../dto/auth-confirm-otp-register.dto';
import { AuthResendOtpByPhone } from '../dto/auth-resend-otp-by-phone.dto';
import { AuthService } from '../services/auth.service';
import { OtpService } from '../services/otp.service';
import { IOtp } from 'interface-models/otp/otp.interface';
import { Utils } from 'apps/api/src/common/utils/util';
import { EntityNotFoundError } from 'typeorm';
import { config } from 'apps/api/src/config';
import { GoSmsApiNotificationService } from 'apps/api/src/infrastructure/notification/services/gosmsapi-notification.service';

@Injectable()
export class AuthOtpApplication {
    constructor(
        private readonly otpService: OtpService,
        private readonly userService: AuthService,
        private readonly goSmsApi: GoSmsApiNotificationService,
    ) {}

    async createNewCodeByPhone(data: AuthResendOtpByPhone): Promise<void> {
        const user = await this.userService.findByPhoneNumber(data.phoneNumber);
        const currentOtp = await this.otpService.findByIdentifier(
            data.phoneNumber,
        );

        const oneMinutesToResend = config.otp.cooldownResend.minutes;
        const fiveMinutesToResend = config.otp.allowRetryAfterMaxRetry.minutes;

        const isInitiateTrial = currentOtp.trial == 1;
        const isSecondTrial = currentOtp.trial == 2;
        const isThirdTrial = currentOtp.trial == 3;
        const isFourthTrial = currentOtp.trial == 4;
        const isFinalTrial = currentOtp.trial == 5;

        const nowTime = new Date();
        const oneMinuteWaiting = new Date(
            currentOtp.updatedAt.setMinutes(
                new Date(currentOtp.updatedAt).getMinutes() +
                    Number(oneMinutesToResend),
            ),
        );

        const halfMinuteWaiting = new Date(
            currentOtp.updatedAt.setSeconds(
                new Date(currentOtp.updatedAt).getSeconds() + 30,
            ),
        );

        const fiveMinuteWaiting = new Date(
            currentOtp.updatedAt.setMinutes(
                new Date(currentOtp.updatedAt).getMinutes() +
                    Number(fiveMinutesToResend),
            ),
        );

        if (isInitiateTrial && nowTime < oneMinuteWaiting) {
            throw new BadRequestException('Cannot resend OTP, wait 1 minutes');
        } else if (
            (isSecondTrial || isThirdTrial || isFourthTrial) &&
            nowTime < halfMinuteWaiting
        ) {
            throw new BadRequestException('Cannot resend OTP, wait 30 seconds');
        } else if (isFinalTrial && nowTime < fiveMinuteWaiting) {
            throw new BadRequestException('Cannot resend OTP, wait 5 minutes');
        }

        let code: string = null;
        code = await this.otpService.createNewCodeByIdentifier(
            data.phoneNumber,
            isFinalTrial,
        );

        const content = `Gunakan ${code} sebagai inputan pendaftaran BuangDisini. Jangan beri tahu siapa-siapa. Meskipun pihak BuangDisini`;
        this.goSmsApi.sendSMS(user.id, content, data.phoneNumber);
    }

    async confirmRegister(data: AuthConfirmOtpRegister): Promise<void> {
        await this.validateOtp(data.phoneNumber, data.code);
        const phoneNumber = data.phoneNumber;
        const dateNow = new Date(Date.now());
        this.userService.updatePhoneNumberVerifiedAtByPhone(
            phoneNumber,
            dateNow,
        );
    }

    async confirmForgotPassword(
        data: AuthConfirmOtpRegister,
        checkIsValid = false,
    ): Promise<void> {
        await this.validateOtp(data.phoneNumber, data.code, checkIsValid);
    }

    private async validateOtp(
        identifier: string,
        code: string,
        checkIsValid = true,
    ): Promise<IOtp | null> {
        try {
            await this.otpService.findByIdentifier(identifier);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestException('The Identifier not match found');
            }

            throw e;
        }

        try {
            const otp = await this.otpService.findByIdentifierAndCode(
                identifier,
                code,
            );

            const dateNow = Utils.nowTime();
            if (otp.expiredAt.getTime() < dateNow) {
                throw new BadRequestException('Expired time period');
            } else if (checkIsValid && otp.isValid) {
                throw new BadRequestException('Not valid otp');
            }

            await this.otpService.updateValidOTP(otp.id);

            return otp;
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new BadRequestException('The OTP code is does not match');
            }

            throw e;
        }
    }
}
