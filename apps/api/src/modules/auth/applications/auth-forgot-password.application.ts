import { Injectable } from '@nestjs/common';
import { AuthForgotPasswordDto } from '../dto/auth-forgot-password.dto';
import { AuthService } from '../services/auth.service';
import { OtpService } from '../services/otp.service';
import { AuthConfirmForgotPasswordDto } from '../dto/auth-confirm-forgot-password.dto';
import { GoSmsApiNotificationService } from 'apps/api/src/infrastructure/notification/services/gosmsapi-notification.service';

@Injectable()
export class AuthForgotPasswordApplication {
    constructor(
        private readonly goSmsNotificationService: GoSmsApiNotificationService,
        private readonly authService: AuthService,
        private readonly otpService: OtpService,
    ) {}

    async forgotPassword(data: AuthForgotPasswordDto): Promise<void> {
        const user = await this.authService.findByPhoneNumber(data.phoneNumber);
        const generateCode = await this.otpService.createNewCodeByIdentifier(
            data.phoneNumber,
        );
        const content = `Gunakan ${generateCode} sebagai inputan lupa password BuangDisini. Jangan beri tahu siapa-siapa. Meskipun pihak BuangDisini`;
        this.goSmsNotificationService.sendSMS(
            user.id,
            content,
            data.phoneNumber,
        );
    }

    async changePassword(data: AuthConfirmForgotPasswordDto): Promise<void> {
        await this.authService.updatePasswordByPhoneNumber(
            data.phoneNumber,
            data.password,
        );
    }
}
