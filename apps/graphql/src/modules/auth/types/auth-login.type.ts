import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

@InputType()
export class AuthLoginRequest {
    @Field()
    @IsNotEmpty()
    @IsNumberString()
    phoneNumber: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;
}

@ObjectType()
export class AuthUserResponse {
    @Field((_type) => Int)
    id: number;

    @Field((_type) => String)
    fullname: string;

    @Field((_type) => String)
    email: string;

    @Field((_type) => String)
    phoneNumber: string;
}

@ObjectType()
export class AuthLoginResponse {
    @Field((_type) => AuthUserResponse)
    user: AuthUserResponse;

    @Field((_type) => String)
    token: string;
}
