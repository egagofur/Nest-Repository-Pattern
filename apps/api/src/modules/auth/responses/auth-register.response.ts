import { Expose } from 'class-transformer';

export class AuthRegisterResponse {
    id: number;

    @Expose({ name: 'phone_number' })
    phoneNumber: string;
}
