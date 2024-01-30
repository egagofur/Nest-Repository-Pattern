import { IndexRequest } from 'apps/api/src/common/request/index.request';
import { IsOptional, IsString } from 'class-validator';

export class UserAddressIndexRequest extends IndexRequest {
    @IsString()
    @IsOptional()
    search?: string;
}
