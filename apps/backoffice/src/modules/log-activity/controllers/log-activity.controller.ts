import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import {
    PERMISSION_BACKOFFICE_DETAIL_LOG_ACTIVITY,
    PERMISSION_BACKOFFICE_SHOW_LOG_ACTIVITY,
} from 'constants/permission.constant';
import { PermissionGuard } from '../../auth/guards/permission.guard';

import { LogActivityIndexRequest } from '../requests/log-activity-index.request';
import { LogActivityResponse } from '../responses/log-activity.response';
import { LogActivityService } from '../services/log-activity.service';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';

@Controller('logs')
export class LogActivityController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly logActivityService: LogActivityService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_LOG_ACTIVITY))
    @Get()
    async indexPage(@Query() indexRequest: LogActivityIndexRequest): Promise<{
        data: LogActivityResponse[];
        meta: IPaginationMeta;
    }> {
        const response = await this.logActivityService.pagination(indexRequest);

        return this.inertiaAdapter.render('LogActivities', {
            data: LogActivityResponse.fromEntities(response.data),
            meta: response.meta,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DETAIL_LOG_ACTIVITY))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<{
        data: LogActivityResponse;
    }> {
        const data = await this.logActivityService.findOneById(id);

        return this.inertiaAdapter.render('LogActivities/DetailLogActivity', {
            data: LogActivityResponse.fromEntity(data),
        });
    }
}
