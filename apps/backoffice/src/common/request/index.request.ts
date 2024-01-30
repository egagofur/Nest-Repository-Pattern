import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderDirectionEnum, OrderDirectionType } from '../enums/index.enum';
import { IPaginateRequest, ISortRequest } from '../interface/index.interface';

export class IndexRequest implements ISortRequest, IPaginateRequest {
    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsEnum(OrderDirectionEnum)
    order?: OrderDirectionType;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Expose({ name: 'per_page' })
    perPage?: number = 15;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsString()
    @IsOptional()
    search?: string;
}
