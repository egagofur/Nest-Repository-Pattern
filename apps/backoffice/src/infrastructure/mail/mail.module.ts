import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { config } from '../../config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: config.mail.smtp.host,
                port: config.mail.smtp.port,
                secure: false,
                auth: {
                    user: config.mail.smtp.user,
                    pass: config.mail.smtp.password,
                },
            },
            defaults: {
                from: `"No Reply" <${config.mail.smtp.emailSender}>`,
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class MailModule {}
