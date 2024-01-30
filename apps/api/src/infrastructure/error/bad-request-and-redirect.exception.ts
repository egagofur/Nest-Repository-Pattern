import { HttpException } from '@nestjs/common';

export default class UnverifiedPhoneNumberException extends HttpException {
    public errorCode: number;

    constructor(message: string) {
        super(message, null);
        this.errorCode = 499;
    }
}
