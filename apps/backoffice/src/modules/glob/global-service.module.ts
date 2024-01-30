import { Module } from '@nestjs/common';
import { GlobalService } from './service/global-service.service';

@Module({
    imports: [],
    controllers: [],
    providers: [GlobalService],
    exports: [GlobalService],
})
export class GlobalServiceModule {}
