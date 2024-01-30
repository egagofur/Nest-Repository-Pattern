import { IndexRequest } from 'apps/backoffice/src/common/request/index.request';
import { IsOptional, IsString } from 'class-validator';

export class UserIndexRequest extends IndexRequest {
    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsString()
    @IsOptional()
    created_at?: string;
}
