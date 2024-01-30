import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOtp } from 'interface-models/otp/otp.interface';
import { Otp } from 'entities/otp/otp.entity';
import { config } from 'apps/api/src/config';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp)
        private otpRepository: Repository<Otp>,
    ) {}

    async findByIdentifierAndCode(
        identifier: string,
        code: string,
    ): Promise<IOtp> {
        return await this.otpRepository.findOneOrFail({
            where: {
                identifier,
                code,
            },
        });
    }

    async findByIdentifier(identifier: string): Promise<IOtp> {
        return await this.otpRepository.findOneOrFail({
            where: {
                identifier,
            },
        });
    }

    async createNewCodeByIdentifier(
        identifier: string,
        isRestartCounter = false,
    ): Promise<string> {
        const otp = await this.otpRepository.findOne({
            where: {
                identifier,
            },
        });

        if (!otp) {
            const otpData = await this.create(identifier);
            return otpData.code;
        }

        const code = await this.createCode();
        const expiredAt = await this.generateExpiredDatetime();
        await this.otpRepository.update(
            {
                identifier,
            },
            {
                isValid: false,
                expiredAt,
                code,
                trial: () =>
                    isRestartCounter ? `1` : `If(trial is null, 0, trial) + 1`,
            },
        );

        return code;
    }

    async updateValidOTP(id: number): Promise<void> {
        await this.otpRepository.update(
            { id },
            {
                isValid: true,
            },
        );
    }

    async updateValidOTPByIdentifier(identifier: string): Promise<void> {
        await this.otpRepository.update(
            { identifier },
            {
                isValid: true,
            },
        );
    }

    private async create(identifier: string): Promise<IOtp> {
        const newOtp = this.otpRepository.create();
        newOtp.expiredAt = await this.generateExpiredDatetime();
        newOtp.code = await this.createCode();
        newOtp.identifier = identifier;
        newOtp.trial = 1;
        return await this.otpRepository.save(newOtp);
    }

    private async createCode(): Promise<string> {
        return await this.generateCode();
    }

    private async generateCode(): Promise<string> {
        const date = new Date();

        // generated code with calculation all date type
        const generateCode =
            date.getFullYear() +
            date.getMonth() +
            date.getDay() +
            date.getHours() +
            date.getMinutes() +
            date.getMilliseconds();

        return `${generateCode}`;
    }

    private async generateExpiredDatetime(): Promise<Date> {
        const dateNowInString = Date.now();
        const dateNow = new Date(dateNowInString);

        // Should chage with config
        const howLongInMinutes = config.otp.timeExpired.minutes;
        return new Date(dateNow.getTime() + howLongInMinutes * 60000);
    }

    async findOneByIdentifierAndCode(
        identifier: string,
        code: string,
    ): Promise<IOtp> {
        return await this.otpRepository.findOne({
            where: {
                identifier,
                code,
            },
        });
    }
}
