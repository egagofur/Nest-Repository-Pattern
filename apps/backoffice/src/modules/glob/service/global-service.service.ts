import { LogActivityDto } from 'entities/log-activity/dto/log-activity.dto';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { getManager } from 'typeorm';

export class GlobalService {
    static createLogActivity(data: LogActivityDto) {
        this.prototype.createLogActivity(data);
    }

    async createLogActivity(logActivityDto: LogActivityDto) {
        const repository = getManager().getRepository(LogActivity);
        await repository
            .createQueryBuilder()
            .insert()
            .into(LogActivity)
            .values(logActivityDto)
            .execute();
    }
}
