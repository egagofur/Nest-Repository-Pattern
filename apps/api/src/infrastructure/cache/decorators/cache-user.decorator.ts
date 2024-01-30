import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export const CacheUser = (): any => {
    const injectRequest = Inject(REQUEST);

    return (
        target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor,
    ) => {
        injectRequest(target, 'request');

        const originalMethod = propertyDescriptor.value;

        //redefine descriptor value within own function block
        propertyDescriptor.value = async function (...args: any[]) {
            const request: Request = this.request;
            request.headers['is-user-cache'] = 'true';
            return await originalMethod.apply(this, args);
        };
    };
};
