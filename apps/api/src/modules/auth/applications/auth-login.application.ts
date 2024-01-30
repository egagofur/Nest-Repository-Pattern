import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { IUserWithToken } from 'interface-models/iam/user-with-token.interface';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'interface-models/iam/jwt-payload.interface';
import { EmailNotificationService } from 'apps/api/src/infrastructure/notification/services/email-notification.service';
import { OneSignalPushNotificationService } from 'apps/api/src/infrastructure/notification/services/one-signal-push-notification.service';
import UnverifiedPhoneNumberException from 'apps/api/src/infrastructure/error/bad-request-and-redirect.exception';
import { OtpService } from '../services/otp.service';
import { GoSmsApiNotificationService } from 'apps/api/src/infrastructure/notification/services/gosmsapi-notification.service';

@Injectable()
export class AuthLoginApplication {
    constructor(
        private jwtService: JwtService,
        private readonly userService: AuthService,
        private readonly otpService: OtpService,
        private readonly oneSignalPushNotificationService: OneSignalPushNotificationService,
        private readonly goSmsNotificationService: GoSmsApiNotificationService,
        private readonly emailNotificationService: EmailNotificationService,
    ) {}

    async basic(data: AuthLoginDto): Promise<IUserWithToken> {
        try {
            const user = await this.userService.validateUser(
                data.phoneNumber,
                data.password,
            );
            const payload: IJwtPayload = {
                id: user.id,
                email: user.email,
                phoneNumber: user.phoneNumber,
            };
            const accessToken: string = this.jwtService.sign(payload);

            return {
                user,
                token: accessToken,
            };
        } catch (_) {
            throw new BadRequestException(
                'No. Telp and Kata Sandi tidak dikenali',
            );
        }
    }

    async addOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        if (playerId) {
            await this.userService.addOneSignalPlayerIdById(id, playerId);
            await this.oneSignalPushNotificationService.setStatus(
                playerId,
                true,
            );
        }
    }

    async sendNotifEmailLoginAttempt(email: string): Promise<void> {
        if (!email) {
            return;
        }

        await this.emailNotificationService.sendEmail(
            'Login Attempt',
            {},
            'login-attempt',
            email,
        );
    }

    async loginAttempt(phoneNumber: string, playerId: string): Promise<void> {
        const user = await this.userService.findByPhoneNumber(phoneNumber);
        if (user.phoneNumberVerifiedAt == null) {
            const code = await this.otpService.createNewCodeByIdentifier(
                user.phoneNumber,
            );
            const content = `Gunakan ${code} sebagai inputan pendaftaran BuangDisini. Jangan beri tahu siapa-siapa. Meskipun pihak BuangDisini`;
            this.goSmsNotificationService.sendSMS(
                user.id,
                content,
                user.phoneNumber,
            );
            throw new UnverifiedPhoneNumberException(
                'Nomor Telepon Belum Terverifikasi',
            );
        }

        const isUUID =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                playerId,
            );
        if (isUUID) {
            await this.addOneSignalPlayerIdById(user.id, playerId);
        }

        await this.sendNotifEmailLoginAttempt(user.email);
    }

    async createTokenByPhoneNumber(
        phoneNumber: string,
    ): Promise<IUserWithToken> {
        try {
            const user = await this.userService.findByPhoneNumber(phoneNumber);

            const payload: IJwtPayload = {
                id: user.id,
                email: user.email,
                phoneNumber: user.phoneNumber,
            };
            const accessToken: string = this.jwtService.sign(payload);

            return {
                user,
                token: accessToken,
            };
        } catch (_) {
            throw new BadRequestException(
                'No. Telp and Kata Sandi tidak dikenali',
            );
        }
    }
}
