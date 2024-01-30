import { Module } from '@nestjs/common';
import { InertiaAdapter } from './adapter/inertia.adapter';

@Module({
    imports: [],
    controllers: [],
    providers: [InertiaAdapter],
    exports: [InertiaAdapter],
})
export class InertiaModule {}
