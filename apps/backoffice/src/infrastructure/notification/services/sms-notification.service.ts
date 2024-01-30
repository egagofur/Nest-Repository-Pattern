import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { config } from 'apps/backoffice/src/config';
import { AxiosResponse } from 'axios';
import FormData from 'form-data';

@Injectable()
export class ZenzivaNotificationService {
    constructor(private httpService: HttpService) {}

    async sendSMS(content: string, phoneNumber: string): Promise<void> {
        const bodyFormData = new FormData();

        bodyFormData.append('userkey', config.sms.zenziva.userKey);
        bodyFormData.append('passkey', config.sms.zenziva.passKey);
        bodyFormData.append('nohp', phoneNumber);
        bodyFormData.append('pesan', content);

        try {
            await this.httpService.post<AxiosResponse<any>>(
                config.sms.zenziva.host,
                bodyFormData,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
        } catch (e) {
            console.log('[Zenziva] - Error ' + e.message);
        }
    }
}
