import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    UnprocessableEntityException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { snakeCase } from 'snake-case';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        value: any,
        { metatype }: ArgumentMetadata,
    ): Promise<any[]> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value, {
            enableImplicitConversion: true,
        });
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new UnprocessableEntityException({
                message: 'Data Not Valid',
                data: this.flattenValidation(errors).map(
                    (data: {
                        parentName: string;
                        property: string;
                        constraints:
                            | { [s: string]: unknown }
                            | ArrayLike<unknown>;
                    }) => {
                        return {
                            property: data.parentName
                                ? data.parentName.substring(1)
                                : snakeCase(data.property),
                            // TODO implement i18n
                            message: Object.values(data.constraints).map(
                                (constraint) => constraint,
                            ),
                        };
                    },
                ),
            });
        }
        return object;
    }

    /**
     * Data Before:
     * [{"property": "varian", "children": [{"property": "berat", "constraints": ["error"]}]}, {"property": "dimensi", "constraints": ["error"]}]
     * Data After:
     * [{"property": "varian.berat", "constraints": ["error"]}, {"property": "dimensi", "constraints": ["error"]}]
     * @param data
     * @param parentName
     */
    private flattenValidation(data: ValidationError[], parentName = ''): any {
        return data.reduce(
            (r: { parentName: string }[], { children, ...rest }: any) => {
                const addParentName = isNaN(rest.property) // removing index on array data
                    ? `${parentName}.${rest.property}`
                    : parentName;
                if (rest.constraints) {
                    r.push({
                        ...rest,
                        ...(parentName && { parentName: addParentName }),
                    });
                }
                if (children.length > 0) {
                    r.push(...this.flattenValidation(children, addParentName));
                }
                return r;
            },
            [],
        );
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private toValidate(metatype: Function): boolean {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
