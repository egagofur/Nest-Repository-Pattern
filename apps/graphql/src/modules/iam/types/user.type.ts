import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
    IPaginateResponse,
    IPaginationMeta,
} from 'apps/graphql/src/common/interface/index.interface';
import { IndexRequest } from 'apps/graphql/src/common/request/index.request';
import { IsOptional, IsString } from 'class-validator';
import { IRole } from 'interface-models/iam/role.interface';
import { IUser } from 'interface-models/iam/user.interface';
import { Role } from './role.type';

@ObjectType()
export class User implements IUser {
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String, { nullable: true })
    identityNumber: string;

    @Field(() => String, { nullable: true })
    phoneNumber: string;

    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    fullname: string;

    @Field(() => Role)
    role: IRole;

    @Field({ nullable: true })
    upadatedAt: Date;

    @Field()
    createdAt: Date;

    @Field({ nullable: true })
    deletedAt: Date;
}

@ObjectType()
export class PaginateMeta implements IPaginationMeta {
    @Field(() => Int)
    page: number;

    @Field(() => Int)
    perPage: number;

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    totalPage: number;
}

@ObjectType()
export class PaginateUser implements IPaginateResponse<User> {
    @Field({ nullable: true })
    meta: PaginateMeta;

    @Field(() => [User])
    data: User[];
}

@InputType()
export class UpdateUserFullname {
    @Field()
    fullname: string;
}

@InputType()
export class UserIndexRequest extends IndexRequest {
    @Field()
    @IsString()
    @IsOptional()
    search?: string;
}
