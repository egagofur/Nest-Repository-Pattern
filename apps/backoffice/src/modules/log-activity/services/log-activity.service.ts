import { Injectable } from '@nestjs/common';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { LogActivityRepository } from '../repositories/log-activity.repository';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { LogActivityIndexRequest } from '../requests/log-activity-index.request';
import { LogActivityCreateRequest } from '../requests/log-activity-create.request';

@Injectable()
export class LogActivityService {
    constructor(private readonly logActivityRepo: LogActivityRepository) {}

    async pagination(
        request: LogActivityIndexRequest,
    ): Promise<IPaginateResponse<ILogActivity>> {
        return this.logActivityRepo.pagination(request);
    }

    async findOneById(id: number): Promise<ILogActivity> {
        return await this.logActivityRepo.findOneById(id);
    }

    async create(data: LogActivityCreateRequest): Promise<void> {
        await this.logActivityRepo.createLog({
            user: data.user,
            source: data.source,
            activity: data.activity,
            menu: data.menu,
            path: data.path,
            metaData: data.metaData,
        });
    }
}
