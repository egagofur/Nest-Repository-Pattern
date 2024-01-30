import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Permission } from './permission.type';

@ObjectType()
export class Role {
    @Field((_type) => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    key?: string;

    @Field((_type) => [Permission])
    permissions?: Permission[];
}
