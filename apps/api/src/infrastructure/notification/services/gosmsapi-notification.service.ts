import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { config } from 'apps/api/src/config';
import { AxiosResponse } from 'axios';
import crypto from 'crypto';

@Injectable()
export class GoSmsApiNotificationService {
    constructor(private httpService: HttpService) {}

    async sendSMS(
        idChanger: number,
        content: string,
        phoneNumber: string,
    ): Promise<void> {
        const combineKey = `${config.sms.gosmsapi.user}${config.sms.gosmsapi.pass}${phoneNumber}`;
        const hashMd5 = crypto
            .createHash('md5')
            .update(combineKey)
            .digest('hex');

        try {
            const { status } = await this.httpService.post<AxiosResponse<any>>(
                `${config.sms.gosmsapi.host}?username=${config.sms.gosmsapi.user}&mobile=${phoneNumber}&message=${content}&trxid=CG${idChanger}&type=0&auth=${hashMd5}`,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                { headers: { 'Content-Type': 'application/json' } },
            );

            console.log('[GOSMSAPI] - Success : ' + status);
        } catch (e) {
            console.log('[GOSMSAPI] - Error ' + e.message);
        }
    }
}
