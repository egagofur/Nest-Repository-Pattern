import { Module } from '@nestjs/common';
import { QueueService } from './services/queue.service';

@Module({
    imports: [],
    controllers: [],
    providers: [QueueService],
    exports: [],
})
export class QueueModule {}
