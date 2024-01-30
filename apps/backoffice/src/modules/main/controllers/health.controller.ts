import { Controller, Get, Res } from '@nestjs/common';
import {
    HealthCheckService,
    TypeOrmHealthIndicator,
    HealthCheck,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import { config } from 'apps/backoffice/src/config';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck(config.database.database),
        ]);
    }
}
