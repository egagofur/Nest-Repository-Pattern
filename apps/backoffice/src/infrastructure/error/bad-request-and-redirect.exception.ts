import { BadRequestException } from '@nestjs/common';

export default class BadRequestAndRedirectException extends BadRequestException {
    public path: string;

    constructor(path: string, message: string) {
        super(message);
        this.path = path;
    }
}
