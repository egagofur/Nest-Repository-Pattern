import {
    Inject,
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserUpdateProfileRequest } from '../request/user-update-profile.request';
import { IUser } from 'interface-models/iam/user.interface';
import { UserService } from '../services/user.service';
import { UserResponse } from '../responses/user.response';

import { UserUpdatePasswordRequest } from '../request/user-update-password.request';
import * as bcrypt from 'bcrypt';
import { UserUpdateEmailRequest } from '../request/user-update-email.request';
import { EmailNotificationService } from 'apps/api/src/infrastructure/notification/services/email-notification.service';
import { OtpService } from '../../auth/services/otp.service';
import { config } from 'apps/api/src/config';
import { OTP_UPDATE_EMAIL } from 'apps/api/src/common/constants/otp.constant';
import { UserUpdatePhoneNumberRequest } from '../request/user-update-phone.reques';
import { GoSmsApiNotificationService } from 'apps/api/src/infrastructure/notification/services/gosmsapi-notification.service';
import { Utils } from 'apps/api/src/common/utils/util';

@Injectable()
export class UserApplication {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly userService: UserService,
        private readonly otpService: OtpService,
        private readonly smsNotificationService: GoSmsApiNotificationService,
        private readonly emailNotificationService: EmailNotificationService,
    ) {}

    async editUser(
        dataUpdate: UserUpdateProfileRequest,
    ): Promise<UserResponse> {
        const userId = this.request.user['id'] || null;
        const newUser = <IUser>{};
        const user = await this.userService.findOneById(userId);

        if (dataUpdate.gender && user.gender) {
            throw new BadRequestException("Sorry, Gender Can't be Update");
        }
        if (dataUpdate.birthDate && user.birthDate) {
            throw new BadRequestException("Sorry, Birthdate Can't be Update");
        }

        newUser.fullname = dataUpdate.fullname;
        if (dataUpdate.birthDate) {
            newUser.birthDate = dataUpdate.birthDate;
        }
        if (dataUpdate.gender) {
            newUser.gender = dataUpdate.gender;
        }

        const updateUser = await this.userService.update(userId, newUser);

        return UserResponse.fromEntity(updateUser);
    }

    async changePassword(
        userPasswordUpdate: UserUpdatePasswordRequest,
    ): Promise<void> {
        const userId = this.request.user['id'] || null;

        const user = await this.userService.findOneById(userId);
        const isPasswordSame = await bcrypt.compare(
            userPasswordUpdate.oldPassword,
            user.password,
        );
        if (!isPasswordSame) {
            throw new BadRequestException('Password lama tidak sesuai');
        }

        const newPassword = await Utils.bcryptHash(
            userPasswordUpdate.newPassword,
        );

        await this.userService.changePassword(userId, newPassword);
    }

    async resendOtpUpdatePhone(newPhoneNumber: string): Promise<void> {
        const userId = this.request.user['id'] || null;
        const currentOtp = await this.otpService.findByIdentifier(
            newPhoneNumber,
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

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            newPhoneNumber,
            isFinalTrial,
        );

        this.smsNotificationService.sendSMS(
            userId,
            'SMS OTP Perubahan Nomor Telepon kamu adalah : ' + otpCode,
            newPhoneNumber,
        );
    }

    async updateEmailByIdentifierAndOtp(
        identifier: string,
        otpCode: string,
        newEmail: string,
    ): Promise<void> {
        const otp = await this.otpService.findByIdentifierAndCode(
            identifier,
            otpCode,
        );
        if (!otp) {
            throw new BadRequestException('Otp tidak ditemukan');
        } else if (otp.isValid || otp.expiredAt < new Date()) {
            throw new BadRequestException('Otp tidak berlaku');
        }

        await this.userService.updateEmailByOldEmail(identifier, newEmail);
        await this.otpService.updateValidOTP(otp.id);
    }

    async updatePhoneByOtp(
        otpCode: string,
        newPhoneNumber: string,
    ): Promise<void> {
        const phoneNumber = this.request.user['phoneNumber'] || null;
        if (!phoneNumber) {
            throw new UnauthorizedException();
        }

        // Cek OTP & New Phone Number
        const otp = await this.otpService.findOneByIdentifierAndCode(
            newPhoneNumber,
            otpCode,
        );

        if (otp == undefined) {
            throw new BadRequestException('OTP number is not match');
        }

        if (otp.isValid || otp.expiredAt < new Date()) {
            throw new BadRequestException('Otp sudah kadaluarsa');
        }

        await this.userService.updatePhoneNumberByPhoneNumber(
            phoneNumber,
            newPhoneNumber,
        );
        await this.otpService.updateValidOTP(otp.id);
    }

    async sendEmailUpdateConfirmation(
        userEmailUpdate: UserUpdateEmailRequest,
    ): Promise<void> {
        const userId = this.request.user['id'] || null;
        const email = this.request.user['email'] || null;
        const isRegistered = await this.userService.isEmailExists(
            userEmailUpdate.newEmail,
            +userId,
        );

        if (isRegistered) {
            throw new BadRequestException('Email sudah terdaftar');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            email,
            true,
        );

        const confirmationLink = `${config.host}/users/confirm-otp/${OTP_UPDATE_EMAIL}/${otpCode}?identifier=${email}&new_identity=${userEmailUpdate.newEmail}`;
        await this.emailNotificationService.sendEmail(
            'Notifikasi perubahan email',
            { email: userEmailUpdate.newEmail, confirmationLink },
            'change-email',
            userEmailUpdate.newEmail,
        );
    }

    async resendOtpUpdateEmail(newEmail: string): Promise<void> {
        const userId = this.request.user['id'] || null;
        const email = this.request.user['email'] || null;
        const isRegistered = await this.userService.isEmailExists(
            newEmail,
            +userId,
        );

        if (isRegistered) {
            throw new BadRequestException('Email sudah terdaftar');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            email,
            true,
        );

        const confirmationLink = `${config.host}/users/confirm-otp/${OTP_UPDATE_EMAIL}/${otpCode}?identifier=${email}&new_identity=${newEmail}`;
        await this.emailNotificationService.sendEmail(
            'Notifikasi perubahan email',
            { email: newEmail, confirmationLink },
            'change-email',
            newEmail,
        );
    }

    async sendPhoneNumberUpdateConfirmation(
        dataUser: UserUpdatePhoneNumberRequest,
    ): Promise<void> {
        const userId = this.request.user['id'] || null;
        const phoneNumber = this.request.user['phoneNumber'] || null;
        const isPhoneNumberExists = await this.userService.isPhoneExists(
            dataUser.newPhoneNumber,
            userId,
        );
        if (!phoneNumber) {
            throw new BadRequestException('Kamu tidak punya noTelp');
        } else if (isPhoneNumberExists) {
            throw new BadRequestException('Nomor telepon sudah terpakai');
        }

        const otpCode = await this.otpService.createNewCodeByIdentifier(
            dataUser.newPhoneNumber,
            true,
        );
        this.smsNotificationService.sendSMS(
            userId,
            'SMS OTP Perubahan Nomor Telepon kamu adalah : ' + otpCode,
            dataUser.newPhoneNumber,
        );
    }

    async accountDelete() {
        const userId = this.request.user['id'] || null;

        await Promise.all([
            this.userService.update(userId, <IUser>{
                deletedAt: new Date(),
            }),
            this.userService.softDelete(userId),
        ]);
    }
}
