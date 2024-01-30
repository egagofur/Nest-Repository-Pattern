import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';

@Module({
    imports: [],
    controllers: [InformationController],
    providers: [],
    exports: [],
})
export class InformationModule {}
