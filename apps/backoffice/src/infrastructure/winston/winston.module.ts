import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
    imports: [
        NestWinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: 'info.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json(),
                    ),
                }),
                new winston.transports.Console({
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple(),
                        winston.format.printf((info) => {
                            return `\n${info.level}: ${info.message} \n ${info.stack}`;
                        }),
                    ),
                }),
            ],
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class WinstonModule {}
