import { UserResponse } from 'apps/backoffice/src/modules/iam/responses/user.response';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { OmitType } from '@nestjs/swagger';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { UserMapper } from '../../iam/mappers/user.mapper';

export class LogActivityResponse extends OmitType(LogActivity, ['user']) {
    user: UserResponse;

    static fromEntity(entity: ILogActivity): LogActivityResponse {
        const response = new LogActivityResponse();

        response.id = entity.id;
        response.user = entity.user && UserMapper.fromEntity(entity.user);
        response.metaData = entity?.metaData;
        response.source = entity?.source;
        response.activity = entity?.activity;
        response.menu = entity?.menu;
        response.path = entity?.path;
        response.createdAt = entity?.createdAt;

        return response;
    }

    static fromEntities(data: ILogActivity[]): LogActivityResponse[] {
        return data.map((data) => this.fromEntity(data));
    }
}
