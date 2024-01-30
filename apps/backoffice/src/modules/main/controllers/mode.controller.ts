import { Controller, Get, Query } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IPauseMode } from 'interface-models/mode/pause-mode.interface';

@Controller('mode')
export class ModeController {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    @Get('/maintain')
    maintainMode(): null {
        return this.inertiaAdapter.render('MaintainMode');
    }

    @Get('/pause')
    pauseMode(
        @Query('message') message: string,
        @Query('start_at') startAt: string,
        @Query('end_at') endAt: string,
    ): { data: IPauseMode } {
        return this.inertiaAdapter.render('PauseMode', {
            data: <IPauseMode>{
                message,
                startAt,
                endAt,
            },
        });
    }
}
