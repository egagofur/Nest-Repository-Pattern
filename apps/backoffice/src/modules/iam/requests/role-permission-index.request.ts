import { IndexRequest } from 'apps/backoffice/src/common/request/index.request';
import { IsOptional, IsString } from 'class-validator';

export class RolePermissionIndexRequest extends IndexRequest {
    @IsString()
    @IsOptional()
    search?: string;
}
