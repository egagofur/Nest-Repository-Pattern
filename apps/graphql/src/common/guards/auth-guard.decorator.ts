import { Inject, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../../modules/iam/services/user.service';
import { Utils } from '../utils/util';

export const AuthGuard = (key = 'user'): any => {
    const injectRequest = Inject(REQUEST);
    const injectUserService = Inject(UserService);

    return (
        target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor,
    ) => {
        injectRequest(target, 'request');
        injectUserService(target, 'userService');

        const originalMethod = propertyDescriptor.value;

        //redefine descriptor value within own function block
        propertyDescriptor.value = async function (...args: any[]) {
            if (key == 'anonymus') {
                return await originalMethod.apply(this, args);
            }

            const request: Request = this.request.req;
            if (!request.headers['authorization']) {
                throw new UnauthorizedException();
            }

            const tokenAuth = request.headers['authorization'];
            const user = Utils.tokenAuthDecoder(tokenAuth);

            const dateExp = new Date(user['exp'] * 1000);
            const userValidation = await this.userService.findOneById(
                user['id'],
            );
            if (!userValidation) {
                throw new UnauthorizedException();
            }

            if (
                dateExp > new Date() &&
                user['phoneNumber'] == userValidation.phoneNumber
            ) {
                return await originalMethod.apply(this, args);
            } else {
                throw new UnauthorizedException();
            }
        };
    };
};
