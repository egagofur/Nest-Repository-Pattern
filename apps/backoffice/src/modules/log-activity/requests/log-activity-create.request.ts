import { OmitType } from '@nestjs/swagger';
import { LogActivity } from 'entities/log-activity/log-activity.entity';

export class LogActivityCreateRequest extends OmitType(LogActivity, ['id']) {
    search?: string;
}
