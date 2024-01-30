import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderDirectionEnum, OrderDirectionType } from '../enums/index.enum';
import { IPaginateRequest, ISortRequest } from '../interface/index.interface';

@InputType()
export class IndexRequest implements ISortRequest, IPaginateRequest {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    sort?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEnum(OrderDirectionEnum)
    order?: OrderDirectionType;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Expose({ name: 'per_page' })
    perPage?: number = 15;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    search?: string;
}
