import BN from 'bn.js';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BigIntMin = (
    number: string,
    validationOptions?: ValidationOptions,
) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (object: any, propertyName: string): void => {
        registerDecorator({
            name: 'bigIntMin',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [number],
            options: validationOptions,
            validator: {
                validate(value: BN, args: ValidationArguments) {
                    if (!value) {
                        return false;
                    }
                    const number = new BN(args.constraints[0]);
                    return value.gte(number);
                },

                defaultMessage() {
                    return `${propertyName} must large then or equal to ${number}`;
                },
            },
        });
    };
};
