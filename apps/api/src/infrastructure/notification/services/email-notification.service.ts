import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailNotificationService {
    constructor(private mailerService: MailerService) {}

    async sendEmail(
        subject: string,
        content: any,
        template: string,
        emailTarget: string,
    ) {
        await this.mailerService
            .sendMail({
                to: emailTarget,
                subject: subject,
                template,
                context: content,
            })
            .catch((e) => {
                console.log('[Email Sender] - Error ' + e.message);
            })
            .finally(() => {
                console.log('[Email Sender] - Done');
            });
    }
}
